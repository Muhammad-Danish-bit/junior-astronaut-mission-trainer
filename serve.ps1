# ============================================================================
# JUNIOR ASTRONAUT MISSION TRAINER - ROBUST LOCAL HTTP SERVER
# Always serves on requested port (default 8082), auto-detects existing server,
# launches browser, and provides live-reload support for seamless editing
# ============================================================================

param(
    [int]$Port = 8082,
    [switch]$NoBrowser = $false
)

# 1. Check if the server is ALREADY running and responding on $Port
$alreadyRunning = $false
try {
    $testResp = Invoke-WebRequest -Uri "http://localhost:$Port/" -UseBasicParsing -TimeoutSec 1 -ErrorAction Stop
    if ($testResp.StatusCode -eq 200) {
        $alreadyRunning = $true
    }
} catch {}

if ($alreadyRunning) {
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  🚀 Junior Astronaut Mission Trainer - Local Server     " -ForegroundColor Cyan
    Write-Host "  Server is ALREADY running on http://localhost:$Port/    " -ForegroundColor Green
    Write-Host "  Directory: $(Get-Location)                              " -ForegroundColor DarkGray
    Write-Host "==========================================================" -ForegroundColor Cyan
    if (-not $NoBrowser) {
        Write-Host "Launching web browser at http://localhost:$Port/..." -ForegroundColor DarkCyan
        Start-Process "http://localhost:$Port/"
    }
    Write-Host "Ready for play & editing on the same localhost: http://localhost:$Port/" -ForegroundColor Green
    exit 0
}

# 2. Build / Update bundle before serving
if (Test-Path "build_bundle.ps1") {
    try {
        & "$PSScriptRoot\build_bundle.ps1" | Out-Null
    } catch {}
}

# 3. Bind HttpListener to the requested port
$listener = $null
for ($attempt = 1; $attempt -le 4; $attempt++) {
    $tempListener = New-Object System.Net.HttpListener
    $prefix = "http://localhost:$Port/"
    try {
        $tempListener.Prefixes.Add($prefix)
        $tempListener.Start()
        $listener = $tempListener
        break
    } catch {
        try { $tempListener.Close() } catch {}
        Start-Sleep -Milliseconds 400
    }
}

if ($listener -eq $null) {
    Write-Error "Failed to bind to http://localhost:$Port/. Port might be held by an orphaned process."
    $indexPath = Join-Path (Get-Location) "index.html"
    Start-Process $indexPath
    exit 1
}

try {
    $url = "http://localhost:$Port/"
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host "  🚀 Junior Astronaut Mission Trainer - Local Server     " -ForegroundColor Cyan
    Write-Host "  URL: $url                                               " -ForegroundColor Green
    Write-Host "  Directory: $(Get-Location)                              " -ForegroundColor DarkGray
    Write-Host "  Press Ctrl+C to stop the server.                        " -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Cyan

    if (-not $NoBrowser) {
        Write-Host "Launching web browser at $url..." -ForegroundColor DarkCyan
        Start-Process $url
    }

    $mime = @{
        ".html" = "text/html; charset=utf-8"
        ".css"  = "text/css; charset=utf-8"
        ".js"   = "application/javascript; charset=utf-8"
        ".json" = "application/json; charset=utf-8"
        ".png"  = "image/png"
        ".svg"  = "image/svg+xml"
        ".ico"  = "image/x-icon"
        ".woff" = "font/woff"
        ".woff2"= "font/woff2"
        ".mp4"  = "video/mp4"
        ".jpg"  = "image/jpeg"
    }

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS and fresh caching headers
        $response.AddHeader("Access-Control-Allow-Origin", "*")
        $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")
        $response.AddHeader("Pragma", "no-cache")
        $response.AddHeader("Expires", "0")

        $localPath = $request.Url.LocalPath

        # Live-reload endpoint for seamless editing on localhost
        if ($localPath -eq "/__live_reload") {
            try {
                $files = Get-ChildItem -Path @("index.html", "js", "css") -Recurse -File -Include *.js,*.html,*.css -ErrorAction SilentlyContinue
                $maxTime = ($files | Measure-Object -Property LastWriteTimeUtc -Maximum).Maximum.Ticks
                $tickBytes = [System.Text.Encoding]::UTF8.GetBytes("$maxTime")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $tickBytes.Length
                $response.OutputStream.Write($tickBytes, 0, $tickBytes.Length)
            } catch {
                $err = [System.Text.Encoding]::UTF8.GetBytes("0")
                $response.OutputStream.Write($err, 0, $err.Length)
            }
            $response.OutputStream.Close()
            continue
        }

        if ($localPath -eq "/" -or [string]::IsNullOrWhiteSpace($localPath)) {
            $localPath = "/index.html"
        }

        $cleanedRelative = $localPath.TrimStart("/").Replace("/", [IO.Path]::DirectorySeparatorChar)
        $filePath = Join-Path (Get-Location) $cleanedRelative

        if ($cleanedRelative -like "*bundle.js" -or $cleanedRelative -eq "index.html") {
            try {
                $bundlePath = Join-Path (Get-Location) "js\bundle.js"
                if (Test-Path $bundlePath) {
                    $bundleTime = (Get-Item $bundlePath).LastWriteTimeUtc
                    $srcFiles = Get-ChildItem -Path "js" -Recurse -Filter "*.js" | Where-Object { $_.Name -ne "bundle.js" }
                    $newestSrc = ($srcFiles | Measure-Object -Property LastWriteTimeUtc -Maximum).Maximum
                    if ($newestSrc -gt $bundleTime -and (Test-Path "build_bundle.ps1")) {
                        & "$PSScriptRoot\build_bundle.ps1" | Out-Null
                    }
                }
            } catch {}
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [IO.Path]::GetExtension($filePath).ToLower()
            $response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
            $bytes = [IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $err = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $localPath")
            $response.OutputStream.Write($err, 0, $err.Length)
        }
        $response.OutputStream.Close()
    }
} catch {
    if ($_.Exception.GetType().Name -ne "HttpListenerException") {
        Write-Error $_
    }
} finally {
    if ($null -ne $listener) {
        try {
            if ($listener.IsListening) {
                $listener.Stop()
            }
            $listener.Close()
        } catch {}
    }
}
