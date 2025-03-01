// src/config/pages.ts

export interface Page {
  uri: string;
  displayName: string;
}

const pages: Page[] = [
  {
    uri: '/',
    displayName: 'Home',
  },
  {
    uri: '/about',
    displayName: 'About',
  },
  {
    uri: '/contact',
    displayName: 'Contact',
  },
  {
    uri: '/profile',
    displayName: 'Profile',
  },
];

export default pages;