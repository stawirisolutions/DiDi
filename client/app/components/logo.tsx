// components/logo.tsx
'use client';

import { PROJECT_NAME } from '@/config';
import React from 'react';

export default function Logo() {
  return (
    <div className="text-2xl font-bold">
      {PROJECT_NAME}
    </div>
  );
}