import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M23.1 12.5C23.1 14.8 21.2 16.7 18.9 16.7C16.6 16.7 14.7 14.8 14.7 12.5C14.7 10.2 16.6 8.3 18.9 8.3C21.2 8.3 23.1 10.2 23.1 12.5Z" fill="currentColor"/>
    <path d="M18.9 20.8V37.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M39.6 20.8V37.5" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round"/>
    <path d="M39.6 29.2C39.6 33.8 35.8 37.5 31.2 37.5C26.6 37.5 22.9 33.8 22.9 29.2C22.9 24.6 26.6 20.8 31.2 20.8C35.8 20.8 39.6 24.6 39.6 29.2Z" stroke="currentColor" strokeWidth="4.5"/>
  </svg>
);