# AI 報告書テスト画面イメージ (Japanese Nurse Care System)

A modern, beautiful web application for managing Japanese nurse care reports with AI-powered report generation capabilities.

## 🌟 Features

- **Dual-Pane Layout**: View previous month's data on the left and enter current month's data on the right
- **Previous Month Data Section (前月の訪問看護報告書)**:
  - Sample data name
  - Disease progress tracking
  - Nursing/rehabilitation content
  - Home care status
  - Family relations (mental format)
  - Special notes
  - PT/OT/ST visit records
  
- **Weekly Records Section (前月の訪問看護記録書Ⅱ)**:
  - 4 weeks of nursing records
  - Separate fields for Ns and PT/OT/ST records
  
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
│   │   ├── TextAreaField.tsx      # Reusable text area component
│   │   └── WeeklyRecordSection.tsx # Weekly record component
│   ├── fonts/                      # Custom fonts
│   ├── globals.css                 # Global styles
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main page
├── public/                         # Static assets
├── package.json                    # Dependencies
├── tailwind.config.ts              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🎨 Component Structure

### Main Components

1. **TextAreaField**: Reusable textarea component with label
   - Props: label, value, onChange, rows, placeholder, disabled
   - Includes focus states and dark mode support

2. **WeeklyRecordSection**: Weekly record entry component
   - Displays Ns and PT/OT/ST records for each week
   - Manages 4 weeks of data

3. **Main Page**: Primary interface
   - Search functionality at the top
   - Left pane: Previous month's data
   - Right pane: Current month's data entry
   - Action buttons: 登録 (Register) and AI報告書生成 (Generate AI Report)

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Features**:
  - Client-side state management with React hooks
  - Responsive grid layout
  - Custom color schemes
  - Smooth animations

## 📝 Usage

1. **Search**: Enter a sample data name in the search field and click 検索 (Search)
2. **View Previous Data**: Review previous month's information in the left pane
3. **Enter Current Data**: Fill in the current month's information in the right pane
4. **Register**: Click 登録 (Register) to save the current data
5. **Generate AI Report**: Click AI報告書生成 (Generate AI Report) to create an automated report

## 🌙 Dark Mode

The application automatically detects and adapts to your system's dark mode preference. All components are fully styled for both light and dark themes.

## 🎯 Future Enhancements

- Backend API integration
- Data persistence
- AI report generation implementation
- Export to PDF functionality
- User authentication
- Data validation
- Historical data viewing

## 📄 License

This project is proprietary software for BridgeX nurse care system.

## 👥 Support

For support and questions, please contact the development team.
