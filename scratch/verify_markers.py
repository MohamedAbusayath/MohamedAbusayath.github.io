import os
import re

html_path = r"c:\Users\91887\OneDrive\Desktop\protfolio\index.html"

with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Verify start boundary
start_marker = '    <!-- ================================================== -->\n    <!-- 3. ABOUT SECTION                                  -->\n    <!-- ================================================== -->'
if start_marker not in content:
    print("ERROR: start_marker not found exactly.")
    # let's try finding by regex
    m = re.search(r'    <!-- ================================================== -->\s+<!-- 3\. ABOUT SECTION', content)
    if m:
        print("Found via regex at:", m.start())
else:
    print("Found exact start_marker!")

end_marker = '  <!-- Certificate Image Modal Lightbox -->'
if end_marker not in content:
    print("ERROR: end_marker not found exactly.")
else:
    print("Found exact end_marker!")
