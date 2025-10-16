# AI 報告書テスト画面イメージ (Japanese Nurse Care System)

A modern, beautiful web application for managing Japanese nurse care reports with AI-powered report generation capabilities and rich text editing.

## 🌟 Features

- **Dual-Pane Layout**: View previous month's data on the left and enter current month's data on the right
- **Previous Month Data Section (前月の訪問看護報告書)**:
  - Disease progress tracking
  - Nursing/rehabilitation content
  - Home care status
  - Family relations (mental format)
  - Special notes
  - PT/OT/ST visit records
  
- **Weekly Records Section (前月の訪問看護記録書Ⅱ)** with **Rich Text Editor**:
  - 4 weeks of nursing records with full formatting support
  - Separate fields for Ns and PT/OT/ST records
  - **Rich text editing features**:
    - Bold formatting
    - Italic formatting
    - Bullet lists
    - Numbered lists
    - Clear formatting option
  - Content stored as HTML with formatting preserved
  
- **Current Month Section**:
  - Empty text areas for new entries
  - Feedback field
  - Registration and AI report generation buttons

- **Modern UI/UX**:
  - Beautiful gradient background
  - Dark mode support
  - Smooth transitions and animations
  - Responsive design
  - Custom scrollbars
  - Hover effects and active states
  - Professional rich text editor interface

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd nurse-care-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 🏗️ Project Structure

```
nurse-care-frontend/
├── app/
│   ├── components/
│   │   ├── TextAreaField.tsx          # Reusable text area component
│   │   ├── WeeklyRecordSection.tsx    # Weekly record with rich text
│   │   └── RichTextEditor.tsx         # Tiptap rich text editor
│   ├── utils/
│   │   └── richTextHelpers.ts         # Rich text parsing utilities
│   ├── fonts/                          # Custom fonts
│   ├── globals.css                     # Global styles + Tiptap styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Main page
├── public/                             # Static assets
├── package.json                        # Dependencies
├── tailwind.config.ts                  # Tailwind CSS + Typography plugin
├── tsconfig.json                       # TypeScript configuration
├── README.md                           # This file
└── RICH_TEXT_USAGE.md                  # Rich text editor documentation
```

## 🎨 Component Structure

### Main Components

1. **TextAreaField**: Reusable textarea component with label
   - Props: label, value, onChange, rows, placeholder, disabled
   - Includes focus states and dark mode support

2. **RichTextEditor**: Tiptap-based rich text editor
   - Full formatting toolbar (Bold, Italic, Lists, Clear)
   - Stores content as HTML strings
   - Dark mode support
   - Active state indicators for formatting buttons

3. **WeeklyRecordSection**: Weekly record entry component
   - Uses RichTextEditor for both Ns and PT/OT/ST records
   - Manages 4 weeks of data
   - Each record preserves formatting information

4. **Main Page**: Primary interface
   - Search functionality at the top
   - Left pane: Previous month's data with rich text weekly records
   - Right pane: Current month's data entry
   - Action buttons: 登録 (Register) and AI報告書生成 (Generate AI Report)

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Typography Plugin
- **Rich Text Editor**: Tiptap (with StarterKit)
- **UI Features**:
  - Client-side state management with React hooks
  - Responsive grid layout
  - Custom color schemes
  - Smooth animations

## 📝 Usage

1. **Search**: Enter a sample data name in the search field and click 検索 (Search)
2. **View Previous Data**: Review previous month's information in the left pane
3. **Edit with Formatting**: Use the rich text editor in weekly records to:
   - Select text and click **B** to make it bold
   - Select text and click **I** to make it italic
   - Use bullet or numbered lists
   - Clear formatting when needed
4. **Enter Current Data**: Fill in the current month's information in the right pane
5. **Register**: Click 登録 (Register) to save the current data
6. **Generate AI Report**: Click AI報告書生成 (Generate AI Report) to create an automated report

## 📊 Rich Text Data Format

The weekly records are stored as HTML strings. When you format text:

**Example input**: "Patient showed **significant improvement**"

**Stored as**: `<p>Patient showed <strong>significant improvement</strong></p>`

### Accessing Formatted Data

```typescript
// The data structure
previousMonth.weeklyRecords = {
  ns: [
    "<p>Week 1 record with <strong>bold text</strong></p>",
    "<p>Week 2 record with <em>italic text</em></p>",
    "<p>Week 3 record</p>",
    "<p>Week 4 record</p>"
  ],
  ptOtSt: [/* Same format */]
}
```

### Extracting Formatting Information

Use the helper utilities:

```typescript
import { analyzeRichText, extractBoldText } from '@/app/utils/richTextHelpers';

const html = previousMonth.weeklyRecords.ns[0];
const analysis = analyzeRichText(html);

console.log(analysis.plainText);    // Plain text without HTML
console.log(analysis.hasBold);      // true/false
console.log(analysis.boldTexts);    // Array of bold text strings
```

See `RICH_TEXT_USAGE.md` for detailed documentation.

## 🌙 Dark Mode

The application automatically detects and adapts to your system's dark mode preference. All components including the rich text editor are fully styled for both light and dark themes.

## 🎯 Recent Updates

### v0.2.0
- ✅ Added Tiptap rich text editor to weekly records
- ✅ Removed サンプルデータ名 fields from both report sections
- ✅ Added rich text formatting: Bold, Italic, Lists
- ✅ Created helper utilities for parsing formatted content
- ✅ Enhanced console logging to show HTML content
- ✅ Added comprehensive rich text usage documentation

### v0.1.0
- Initial release with basic form structure
- Dual-pane layout
- Search functionality
- Dark mode support

## 📚 Documentation

- **README.md** (this file): General project overview
- **RICH_TEXT_USAGE.md**: Detailed guide for rich text editor usage and data handling

## 🎯 Future Enhancements

- Backend API integration for data persistence
- AI report generation implementation
- Export to PDF functionality with formatted text
- User authentication
- Data validation
- Historical data viewing
- Print-friendly layouts

## 📦 Dependencies

### Production
- `next`: 14.2.33
- `react`: ^18
- `react-dom`: ^18
- `axios`: ^1.12.2
- `@tiptap/react`: Latest
- `@tiptap/starter-kit`: Latest
- `@tiptap/pm`: Latest

### Development
- `typescript`: ^5
- `tailwindcss`: ^3.4.1
- `@tailwindcss/typography`: Latest
- `@types/node`: ^20
- `@types/react`: ^18
- `@types/react-dom`: ^18

## 📄 License

This project is proprietary software for BridgeX nurse care system.

## 👥 Support

For support and questions, please contact the development team.

---

**Note**: The rich text editor in the weekly records section stores content as HTML. This allows you to retrieve not just the text, but also information about which parts are bolded, italicized, or formatted as lists. See `RICH_TEXT_USAGE.md` for examples.
