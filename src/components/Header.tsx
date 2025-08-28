'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/posts', label: 'Posts' },
  { href: '/users', label: 'Users' },
  { href: '/profile', label: 'Profile' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/admin', label: 'Admin' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto flex gap-6 px-4 py-3">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'text-gray-600 hover:text-blue-600 transition-colors',
              pathname === item.href && 'font-semibold text-blue-600'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
