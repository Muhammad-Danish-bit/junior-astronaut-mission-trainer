# ============================================================================
# UNIVERSAL BUNDLE GENERATOR - ALL 9 STAGES
# Combines modular ES6 files into a single zero-dependency file:// bundle
# ============================================================================

$files = @(
    "js\config.js",
    "js\nasa.js",
    "js\audio.js",
    "js\phaserEngine.js",
    "js\state.js",
    "js\mission.js",
    "js\components\nasaModal.js",
    "js\components\rocketSelectModal.js",
    "js\components\astronautPrepModal.js",
    "js\components\missionBriefingModal.js",
    "js\components\achievementsModal.js",
    "js\components\startMissionModal.js",
    "js\components\guideModal.js",
    "js\components\greenhouseModal.js",
    "js\components\extractionModal.js",
    "js\components\dashboard.js",
    "js\components\rocketSelect.js",
    "js\components\checklist.js",
    "js\components\launchFlight.js",
    "js\components\transitMission.js",
    "js\components\lander.js",
    "js\components\surfaceMissions.js",
    "js\components\events.js",
    "js\components\surfaceCamp.js",
    "js\components\debrief.js",
    "js\components\cinematic.js",
    "js\main.js"
)

$bundleCode = "(function() {`n'use strict';`n`n"

foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content -Path $f -Raw -Encoding UTF8
        # Strip import statements
        $content = [regex]::Replace($content, "(?m)^\s*import\s+[^;]+;\s*$", "")
        # Strip export default and export keywords while preserving const, class, function, let, var
        $content = [regex]::Replace($content, "(?m)^\s*export\s+default\s+", "")
        $content = [regex]::Replace($content, "(?m)^\s*export\s+", "")
        $bundleCode += "// --- File: $f ---`n" + $content + "`n`n"
    } else {
        Write-Warning "File not found: $f"
    }
}

$bundleCode += "})();`n"

Set-Content -Path "js\bundle.js" -Value $bundleCode -Encoding UTF8
Write-Host "Bundle generated successfully: js\bundle.js"
