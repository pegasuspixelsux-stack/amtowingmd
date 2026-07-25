Add-Type -AssemblyName System.Drawing

function New-PlaceholderImage {
    param(
        [string]$Path,
        [int]$Width,
        [int]$Height,
        [string]$Label,
        [string]$HexColor
    )
    $color = [System.Drawing.ColorTranslator]::FromHtml($HexColor)
    $bmp = New-Object System.Drawing.Bitmap $Width, $Height
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear($color)
    $font = New-Object System.Drawing.Font("Arial", [Math]::Floor($Width / 22), [System.Drawing.FontStyle]::Bold)
    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center
    $rect = New-Object System.Drawing.RectangleF 0, 0, $Width, $Height
    $g.DrawString($Label, $font, [System.Drawing.Brushes]::White, $rect, $format)
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
}

New-Item -ItemType Directory -Force -Path "public/images" | Out-Null

New-PlaceholderImage -Path "public/images/hero-placeholder.jpg" -Width 1920 -Height 1080 `
    -Label "A&M Repair & Towing`nHero Photo Placeholder" -HexColor "#212121"

New-PlaceholderImage -Path "public/images/towing-placeholder.jpg" -Width 1200 -Height 900 `
    -Label "Tow Truck Photo Placeholder" -HexColor "#D32F2F"

Write-Host "Generated public/images/hero-placeholder.jpg and public/images/towing-placeholder.jpg"
