import re

path = 'src/engine/document-engine/DocumentCategorizer.ts'
with open(path, 'r') as f:
    content = f.read()

# Fix the broken regex: [/note\s*\d{1,2}/{1,2}/i]
# should be:  [/\bnote\s*\d{1,2}\/\d{1,2}\b/i]
old = '[/note\\s*\\d{1,2}/{1,2}/i]'
new = '[/\\bnote\\s*\\d{1,2}\\/\\d{1,2}\\b/i]'

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print('Fixed regex in DocumentCategorizer.ts')
else:
    print('Pattern not found, checking...')
    # Show lines around the problem
    for i, line in enumerate(content.split('\n'), 1):
        if 'patterns' in line and 'note' in line:
            print(f'Line {i}: {repr(line)}')
