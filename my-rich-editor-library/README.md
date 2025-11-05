# Angular Rich Text Editor (Standalone Component)

קומפוננטת עורך טקסט עשיר פשוטה עבור Angular 20, תומכת ב-RTL ועברית.

מבנה התיקייה שנוצר:

my-rich-editor-library/
├── src/
│   ├── lib/
│   │   └── rich-text-editor.component.ts
│   └── public-api.ts
├── package.json
├── ng-package.json
└── README.md

מה עשיתי:
- הוספתי את הקומפוננטה `RichTextEditorComponent` ב-`src/lib/rich-text-editor.component.ts`.
- הוספתי את `src/public-api.ts` (כניסת הספרייה עבור ng-packagr).
- הוספתי `package.json` ו-`ng-package.json` בהתאם להגדרות ששלחת.

איך לבנות ולפרסם (מקומי / CI):

1. להתקין תלותיות (בפרויקט הספרייה):

```bash
cd my-rich-editor-library
npm install
```

2. לבנות את הספרייה בעזרת ng-packagr:

```bash
npm run build
```

3. לפרסם ל-NPM (לאחר בדיקה):

```bash
npm run publish:npm
```

שימוש בספרייה באפליקציית לקוח (לאחר פרסום):

```ts
import { RichTextEditorComponent } from '@yourname/angular-rich-text-editor';

// ואז להשתמש ב-<rich-text-editor [(ngModel)]="myContent"></rich-text-editor>
```

הערות ונקודות חשובות:
- הבנייה (`ng-packagr`) דורשת חבילות dev כמו `ng-packagr` ו-`@angular/compiler-cli`. אם תריץ `npm install` בתוך `my-rich-editor-library` זה יתקין אותן (בהנחה שיש גישה לאינטרנט).
- בסביבה זו לא ניסיתי להריץ את הבנייה אוטומטית; אם תרצה, אוכל לנסות להריץ `npm install` ו-`npm run build` ולדווח על התוצאות/שגיאות.
- תיקנתי את `styles` של הקומפוננטה כך שיהיה מחרוזת תבנית (template string), אחרת TypeScript היה זורק שגיאה.

רוצה שאנסה להריץ `npm install` ו`npm run build` כאן ולדווח על התוצאות? אני יכול להמשיך ולתקן שגיאות בנייה במידה ויהיו.
