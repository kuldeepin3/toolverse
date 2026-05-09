import { 
  Calculator, 
  CalendarDays, 
  Clock, 
  Activity, 
  QrCode, 
  KeyRound, 
  FileJson, 
  Type, 
  Image as ImageIcon, 
  FileImage,
  FileDown
} from 'lucide-react';

export const toolsData = [
  {
    id: 'pdf-compressor',
    title: 'PDF Size Reducer',
    description: 'Optimize and reduce PDF file size directly in your browser without losing quality.',
    icon: FileDown,
    path: '/tools/pdf-compressor',
    category: 'Utility',
    popular: true
  },
  {
    id: 'cgpa-calculator',
    title: 'CGPA Calculator',
    description: 'Calculate your Semester and Cumulative GPA easily with dynamic credit inputs.',
    icon: Calculator,
    path: '/tools/cgpa-calculator',
    category: 'Student',
    popular: true
  },
  {
    id: 'attendance-calculator',
    title: 'Attendance Calculator',
    description: 'Find out exactly how many classes you need to attend to reach your goal.',
    icon: CalendarDays,
    path: '/tools/attendance-calculator',
    category: 'Student',
    popular: true
  },
  {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, and seconds.',
    icon: Clock,
    path: '/tools/age-calculator',
    category: 'Utility',
    popular: false
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Check your Body Mass Index to stay on top of your health.',
    icon: Activity,
    path: '/tools/bmi-calculator',
    category: 'Health',
    popular: false
  },
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Generate high-quality QR codes for links, text, and contacts.',
    icon: QrCode,
    path: '/tools/qr-code-generator',
    category: 'Utility',
    popular: true
  },
  {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Create strong, secure passwords with custom requirements.',
    icon: KeyRound,
    path: '/tools/password-generator',
    category: 'Security',
    popular: true
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, beautify, and minify your JSON data instantly.',
    icon: FileJson,
    path: '/tools/json-formatter',
    category: 'Developer',
    popular: false
  },
  {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, and estimate reading time for any text.',
    icon: Type,
    path: '/tools/word-counter',
    category: 'Utility',
    popular: false
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description: 'Compress images without losing quality to save space and bandwidth.',
    icon: ImageIcon,
    path: '/tools/image-compressor',
    category: 'Media',
    popular: true
  },
  {
    id: 'image-to-pdf',
    title: 'Image to PDF Converter',
    description: 'Convert multiple images into a single PDF document.',
    icon: FileImage,
    path: '/tools/image-to-pdf',
    category: 'Media',
    popular: false
  }
];
