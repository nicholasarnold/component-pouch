import React from 'react';
import './TopMenu.css';

const menu = [
  {
    label: 'About this Project',
    url: './about/'
  },
  {
    label: 'Credits',
    url: './credits/'
  },
  {
    label: 'Legal Stuff',
    url: './legal/'
  }
];


export class TopMenu extends React.Component {
  render() {
    return (
      <nav>
        <div className="menu row">
          {menu.map((item, index) => {
            return (
              <div className="top-menu-item col" key={index}>
                <a href={item.url}>{item.label}</a>
              </div>
            )
          })}
        </div>
      </nav>
    );
  }
}

/*

<div className="top-menu row justify-content-start">
</div>

*/