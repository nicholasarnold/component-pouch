import React from 'react';
import { TopMenu } from '../TopMenu/TopMenu';
import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <header>
      <div className="header container">
        <TopMenu />
        <Logo />
      </div>
    </header>
  )
}