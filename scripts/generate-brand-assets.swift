import AppKit

let root = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
let brandDirectory = root.appendingPathComponent("public/brand", isDirectory: true)
try FileManager.default.createDirectory(
    at: brandDirectory,
    withIntermediateDirectories: true
)

func pngData(from image: NSImage) throws -> Data {
    guard
        let tiff = image.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiff),
        let data = bitmap.representation(using: .png, properties: [:])
    else {
        throw NSError(domain: "BrandAssets", code: 1)
    }
    return data
}

func makeMark(size: CGFloat) throws -> NSImage {
    let image = NSImage(size: NSSize(width: size, height: size))
    image.lockFocus()

    let background = NSBezierPath(
        roundedRect: NSRect(x: 0, y: 0, width: size, height: size),
        xRadius: size * 0.17,
        yRadius: size * 0.17
    )
    NSColor(calibratedRed: 70 / 255, green: 33 / 255, blue: 26 / 255, alpha: 1).setFill()
    background.fill()

    let accent = NSBezierPath(
        roundedRect: NSRect(x: 0, y: 0, width: size, height: size * 0.14),
        xRadius: size * 0.04,
        yRadius: size * 0.04
    )
    NSColor(calibratedRed: 164 / 255, green: 56 / 255, blue: 32 / 255, alpha: 1).setFill()
    accent.fill()

    let paragraph = NSMutableParagraphStyle()
    paragraph.alignment = .center
    let font = NSFont.systemFont(ofSize: size * 0.42, weight: .heavy)
    let attributes: [NSAttributedString.Key: Any] = [
        .font: font,
        .foregroundColor: NSColor(calibratedRed: 241 / 255, green: 211 / 255, blue: 178 / 255, alpha: 1),
        .paragraphStyle: paragraph,
        .kern: -size * 0.025,
    ]
    let text = "JC" as NSString
    let textRect = NSRect(x: 0, y: size * 0.24, width: size, height: size * 0.48)
    text.draw(in: textRect, withAttributes: attributes)

    image.unlockFocus()
    return image
}

let mark = try makeMark(size: 512)
let markData = try pngData(from: mark)
try markData.write(to: brandDirectory.appendingPathComponent("jc-mark.png"))
try markData.write(to: brandDirectory.appendingPathComponent("jc-favicon.png"))

print("Generated JC mark and favicon assets.")
