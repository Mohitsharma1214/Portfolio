import os
import json
import shutil
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from PIL import Image, ImageDraw, ImageFont

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPTS_DIR = os.path.join(ROOT_DIR, 'scripts')
PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
DIST_DIR = os.path.join(ROOT_DIR, 'dist')
FONT_VAR_PATH = os.path.join(SCRIPTS_DIR, 'PlusJakartaSans.ttf')
STATIC_FONT_PATH = os.path.join(SCRIPTS_DIR, 'PlusJakartaSans-ExtraBold.ttf')

def create_static_font():
    """Instantiate static Plus Jakarta Sans ExtraBold (wght=800) from variable font."""
    var_font = TTFont(FONT_VAR_PATH)
    static_font = instantiateVariableFont(var_font, {'wght': 800})
    static_font.save(STATIC_FONT_PATH)
    return STATIC_FONT_PATH

def generate_svg(font_path, output_svg_path):
    """Generate pixel-perfect scalable vector SVG with true glyph curves."""
    font = TTFont(font_path)
    glyph_set = font.getGlyphSet()
    
    b_pen_m = BoundsPen(glyph_set)
    glyph_set['M'].draw(b_pen_m)
    m_minx, m_miny, m_maxx, m_maxy = b_pen_m.bounds
    
    b_pen_s = BoundsPen(glyph_set)
    glyph_set['S'].draw(b_pen_s)
    s_minx, s_miny, s_maxx, s_maxy = b_pen_s.bounds
    
    raw_cap_height = font['OS/2'].sCapHeight
    target_h = 210.0  # Balanced monogram height on 512 squircle
    scale = target_h / raw_cap_height
    gap = 16.0  # Crisp letter spacing
    
    m_w = (m_maxx - m_minx) * scale
    s_w = (s_maxx - s_minx) * scale
    total_w = m_w + gap + s_w
    
    start_x = (512.0 - total_w) / 2.0
    baseline_y = 512.0 - ((512.0 - target_h) / 2.0)
    
    m_tx = start_x - m_minx * scale
    s_tx = start_x + m_w + gap - s_minx * scale
    ty = baseline_y
    
    svg_pen_m = SVGPathPen(glyph_set)
    t_pen_m = TransformPen(svg_pen_m, (scale, 0, 0, -scale, m_tx, ty))
    glyph_set['M'].draw(t_pen_m)
    m_path = svg_pen_m.getCommands()
    
    svg_pen_s = SVGPathPen(glyph_set)
    t_pen_s = TransformPen(svg_pen_s, (scale, 0, 0, -scale, s_tx, ty))
    glyph_set['S'].draw(t_pen_s)
    s_path = svg_pen_s.getCommands()
    
    combined_path = f"{m_path} {s_path}"
    
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="msBrandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
  </defs>
  <!-- Modern continuous squircle (rx=116 at 512x512) -->
  <rect width="512" height="512" rx="116" fill="url(#msBrandGrad)" />
  <!-- Crisp inner ring for contrast on dark/light browser tabs -->
  <rect x="8" y="8" width="496" height="496" rx="108" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="8" />
  <!-- Authentic Geometric ExtraBold Monogram Glyphs -->
  <path d="{combined_path}" fill="#ffffff" />
</svg>
'''
    with open(output_svg_path, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"✅ Generated vector SVG: {output_svg_path}")

def render_master_png(static_font_path, size=1024):
    """Render a high-resolution 1024x1024 master PNG for downsampling."""
    im = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # 1. Gradient from #2563eb to #4f46e5
    grad = Image.new('RGBA', (size, size))
    for y in range(size):
        for x in range(size):
            t = (x + y * 1.05) / (size * 2.05)
            t = min(1.0, max(0.0, t))
            r = int(0x25 * (1 - t) + 0x4f * t)
            g = int(0x63 * (1 - t) + 0x46 * t)
            b = int(0xeb * (1 - t) + 0xe5 * t)
            grad.putpixel((x, y), (r, g, b, 255))
            
    mask = Image.new('L', (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    radius = int(size * 0.2265)  # 116 at 512 -> 232 at 1024
    mask_draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=radius, fill=255)
    im.paste(grad, (0, 0), mask)
    
    # Inner border
    stroke_w = max(2, int(size * 0.0156))  # 16 at 1024, 8 at 512
    inset = stroke_w
    inner_rad = max(4, radius - inset)
    draw.rounded_rectangle(
        [(inset, inset), (size - 1 - inset, size - 1 - inset)],
        radius=inner_rad,
        outline=(255, 255, 255, 46),
        width=stroke_w
    )
    
    # Letters MS in Plus Jakarta Sans ExtraBold
    font_size = int(size * 0.420)  # ~430 at 1024
    font = ImageFont.truetype(static_font_path, font_size)
    
    bbox_m = font.getbbox('M')
    bbox_s = font.getbbox('S')
    
    m_w = bbox_m[2] - bbox_m[0]
    s_w = bbox_s[2] - bbox_s[0]
    cap_h = bbox_m[3] - bbox_m[1]
    
    letter_spacing = int(size * 0.031)  # ~32 at 1024
    total_w = m_w + letter_spacing + s_w
    start_x = (size - total_w) / 2
    start_y = (size - cap_h) / 2 - bbox_m[1]
    
    draw.text((start_x - bbox_m[0], start_y), 'M', font=font, fill=(255, 255, 255, 255))
    draw.text((start_x + m_w + letter_spacing - bbox_s[0], start_y), 'S', font=font, fill=(255, 255, 255, 255))
    
    return im

def build_favicon_suite():
    print("🎨 [Favicon Generator]: Starting pixel-perfect favicon suite generation...")
    static_font = create_static_font()
    
    svg_path = os.path.join(PUBLIC_DIR, 'favicon.svg')
    generate_svg(static_font, svg_path)
    
    master_img = render_master_png(static_font, size=1024)
    
    png_targets = {
        'favicon-16x16.png': (16, 16),
        'favicon-32x32.png': (32, 32),
        'favicon-48x48.png': (48, 48),    # Google Search 1x Compliant
        'favicon-96x96.png': (96, 96),    # Google Search 2x Compliant
        'favicon-144x144.png': (144, 144), # Google Search 3x / Windows Tile
        'favicon-192x192.png': (192, 192), # Google Search 4x / Android Chrome
        'favicon-512x512.png': (512, 512), # PWA / Android Splash
        'apple-touch-icon.png': (180, 180), # iOS Safari Home Screen
    }
    
    for filename, (w, h) in png_targets.items():
        resized = master_img.resize((w, h), Image.Resampling.LANCZOS)
        out_file = os.path.join(PUBLIC_DIR, filename)
        resized.save(out_file, 'PNG', optimize=True)
        print(f"✅ Generated {filename} ({w}x{h})")
        
    # Generate multi-resolution favicon.ico containing 16x16, 32x32, 48x48, 64x64
    ico_path = os.path.join(PUBLIC_DIR, 'favicon.ico')
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    master_img.save(
        ico_path,
        format='ICO',
        sizes=ico_sizes
    )
    print(f"✅ Generated multi-resolution favicon.ico {ico_sizes}")
    
    # Generate site.webmanifest
    manifest = {
        "name": "Mohit Sharma — AI Systems Engineer",
        "short_name": "Mohit Sharma",
        "description": "Portfolio of Mohit Sharma, AI Engineer specializing in real-time computer vision, low-latency edge AI on Raspberry Pi, and production LLM pipelines.",
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#2563eb",
        "icons": [
            {
                "src": "/favicon-192x192.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any maskable"
            },
            {
                "src": "/favicon-512x512.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any maskable"
            }
        ]
    }
    manifest_path = os.path.join(PUBLIC_DIR, 'site.webmanifest')
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)
    print(f"✅ Generated site.webmanifest")
    
    # Sync all generated files to dist/ if dist/ exists
    if os.path.exists(DIST_DIR):
        for item in list(png_targets.keys()) + ['favicon.svg', 'favicon.ico', 'site.webmanifest']:
            src = os.path.join(PUBLIC_DIR, item)
            dst = os.path.join(DIST_DIR, item)
            shutil.copy2(src, dst)
        print("✅ Synced all favicons and site.webmanifest to dist/")
        
    print("🎉 [Favicon Generator]: All favicon assets generated successfully!")

if __name__ == '__main__':
    build_favicon_suite()
