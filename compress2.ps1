Add-Type -AssemblyName System.Drawing

$files = Get-ChildItem -Recurse public/ | Where-Object { $_.Length -gt 5MB -and $_.Extension -eq '.jpg' }
foreach ($file in $files) {
    $path = $file.FullName
    Write-Host "Processing $path"
    $image = [System.Drawing.Image]::FromFile($path)
    
    # Calculate new dimensions
    $max = 1920
    $ratio = $image.Width / $image.Height
    if ($image.Width -gt $max) {
        $w = $max
        $h = [math]::Round($max / $ratio)
    } else {
        $w = $image.Width
        $h = $image.Height
    }
    
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($image, 0, 0, $w, $h)
    $g.Dispose()
    $image.Dispose()
    
    # Rename original to .bak
    Rename-Item -Path $path -NewName ($file.Name + ".bak") -Force
    
    # Setup JPEG compression
    $encoders = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
    $jpegEncoder = $encoders | Where-Object { $_.MimeType -eq 'image/jpeg' }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]70)
    
    $bmp.Save($path, $jpegEncoder, $encoderParams)
    $bmp.Dispose()
    Write-Host "Compressed $path"
}
