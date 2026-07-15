Add-Type -AssemblyName System.Drawing
$imagePath = 'public\imgpag5\estatico.jpg'
$outPath = 'public\imgpag5\estatico_cropped.jpg'

$img = [System.Drawing.Image]::FromFile($imagePath)

# We want a 16:9 aspect ratio.
# Since it's currently 3456x5184 (portrait), taking the full width 3456 gives a height of 3456 * 9 / 16 = 1944.
$targetWidth = $img.Width
$targetHeight = [math]::Round($targetWidth * 9 / 16)

# Calculate Y offset to crop from the vertical center
$yOffset = [math]::Round(($img.Height - $targetHeight) / 2)

$rect = New-Object System.Drawing.Rectangle(0, $yOffset, $targetWidth, $targetHeight)
$bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
$bmp.SetResolution($img.HorizontalResolution, $img.VerticalResolution)

$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
$bmp.Dispose()
$img.Dispose()

Write-Output "Image cropped successfully to $targetWidth x $targetHeight."
