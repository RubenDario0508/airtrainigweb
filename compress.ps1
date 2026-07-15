Add-Type -AssemblyName System.Drawing
$images = @('operaciones/Imágenes/Imagen FOndo.jpg', 'alianzas/Alianza Aeroregional SKY.jpg', 'alianzas/Alaianza VIP.jpg', 'alianzas/Alainza Marca Pasos.jpg', 'biblioteca/Biblioteca/IMG_4565.jpg')
foreach ($img in $images) {
    $path = Join-Path -Path "C:\Users\nancy\OneDrive\Escritorio\airtraing/public" -ChildPath $img
    if (Test-Path $path) {
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
        Rename-Item -Path $path -NewName ($path + ".bak") -Force
        
        # Setup JPEG compression
        $encoders = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()
        $jpegEncoder = $encoders | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]70)
        
        $bmp.Save($path, $jpegEncoder, $encoderParams)
        $bmp.Dispose()
        Write-Host "Compressed $path"
    } else {
        Write-Host "Not found: $path"
    }
}
