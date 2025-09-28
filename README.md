# 🚀 Next.js Supabase Dashboard

A complete, production-ready cryptocurrency mining dashboard built with Next.js, Supabase, and modern web technologies.

## ✨ Features

### 🔐 **Authentication System**
- Email/password authentication with Supabase Auth
- Google OAuth integration
- Password reset functionality
- Secure session management

### 👤 **User Management**
- Complete user profiles with avatar uploads
- Wallet address integration
- Profile customization (bio, country, telegram)
- Account statistics and completion tracking

### 📊 **Advanced Analytics**
- Real-time mining performance charts
- Earnings tracking with Chart.js
- Mining distribution visualization
- Historical data analysis
- Performance metrics dashboard

### 🎯 **Referral System**
- Unique referral link generation
- Referral tracking and rewards
- Bonus point system
- Commission tracking

### 🔔 **Notification System**
- Real-time in-app notifications
- Email notifications (via Supabase)
- Notification center with read/unread status
- Activity feed

### 🛠 **Admin Panel**
- User management interface
- Analytics overview
- System administration tools
- User activity monitoring

### 🎨 **Modern UI/UX**
- Dark/Light mode toggle
- Responsive design (mobile, tablet, desktop)
- Animated components with Framer Motion
- Shadcn UI component system
- Tailwind CSS styling

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI + Radix UI
- **Charts**: Chart.js & React-Chartjs-2
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nextjs-supabase-dashboard
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

1. Copy the environment file:
```bash
cp .env.local.example .env.local
```

2. Fill in your Supabase credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the following SQL in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  country TEXT,
  telegram TEXT,
  wallet_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stats table
CREATE TABLE stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  mining_balance DECIMAL(20, 8) DEFAULT 0,
  referrals INTEGER DEFAULT 0,
  earnings DECIMAL(20, 8) DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create referrals table
CREATE TABLE referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  referred_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  referral_code TEXT NOT NULL,
  reward_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT CHECK (type IN ('info', 'success', 'warning', 'error')) DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Row Level Security Policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON stats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stats" ON stats FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own referrals" ON referrals FOR SELECT USING (auth.uid() = referrer_id OR auth.uid() = referred_id);
CREATE POLICY "Users can insert referrals" ON referrals FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policy for avatars
CREATE POLICY "Avatar images are publicly accessible" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Users can upload their own avatar" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their own avatar" ON storage.objects FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);
```

3. Enable Google OAuth (optional):
   - Go to Authentication > Providers in your Supabase dashboard
   - Enable Google provider
   - Add your Google OAuth credentials

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # Dashboard pages
│   ├── profile/              # Profile management
│   ├── admin/                # Admin panel
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # Reusable components
│   ├── auth/                 # Authentication components
│   ├── layout/               # Layout components
│   └── ui/                   # UI components (Shadcn)
├── lib/                      # Utility functions
│   ├── auth.ts               # Authentication helpers
│   ├── database.types.ts     # Database type definitions
│   ├── referrals.ts          # Referral system
│   ├── supabase.ts           # Supabase client
│   └── utils.ts              # General utilities
├── hooks/                    # Custom React hooks
├── styles/                   # Additional styles
├── public/                   # Static assets
└── README.md                 # This file
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub/GitLab/Bitbucket

2. Import your project to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Add environment variables in Vercel:
   - Go to your project settings
   - Add all the environment variables from `.env.example`

4. Deploy:
   ```bash
   vercel --prod
   ```

### Deploy to Other Platforms

This project is compatible with:
- **Netlify**: Add build command `npm run build` and publish directory `out`
- **Railway**: Automatic deployment with `railway up`
- **Heroku**: Add `heroku-postbuild` script to package.json

## 🔧 Configuration

### Customizing the Theme

Edit `tailwind.config.js` to customize colors, fonts, and other design tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom primary colors
        }
      }
    }
  }
}
```

### Adding New Features

1. **Create a new page**: Add files to the `app/` directory
2. **Add components**: Create reusable components in `components/`
3. **Database changes**: Update the schema and types in `lib/database.types.ts`
4. **API functions**: Add helpers to `lib/` directory

## 📊 Analytics Setup

The dashboard includes Chart.js integration. To customize charts:

1. Edit chart configurations in dashboard components
2. Add new chart types by importing from `react-chartjs-2`
3. Customize colors and animations in chart options

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all Supabase tables
- **Input validation** with Zod schemas
- **CSRF protection** via Supabase Auth
- **Secure headers** configured in `next.config.js`
- **Environment variable validation**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub for bug reports
- **Discussions**: Use GitHub Discussions for questions and ideas

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] WebSocket real-time updates
- [ ] Advanced analytics with AI insights
- [ ] Multi-language support (i18n)
- [ ] Cryptocurrency price tracking
- [ ] Advanced admin dashboard
- [ ] API rate limiting
- [ ] Email templates customization

---

**Built with ❤️ using Next.js, Supabase, and modern web technologies.**