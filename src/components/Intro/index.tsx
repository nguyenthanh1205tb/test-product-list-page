import { GithubOutlined } from '@ant-design/icons';
import React from 'react';
import MyResumePNG from 'src/assets/images/my-resume.png';

function Intro() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl font-semibold py-8">Product List - Test</h1>
      <div className="flex items-center space-x-4 intro">
        <a
          className="flex items-center space-x-2"
          href="https://aaron.alpinus.tech/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={MyResumePNG} className="w-6" alt="my logo" />
          <span>My resume website</span>
        </a>
        <a
          href="https://github.com/nguyenthanh1205tb"
          target="_blank"
          rel="noreferrer"
        >
          <GithubOutlined className="mr-2" />
          My github
        </a>
        <a
          href="https://github.com/nguyenthanh1205tb/test-product-list-page"
          target="_blank"
          rel="noreferrer"
        >
          <GithubOutlined className="mr-2" />
          Product list test source code
        </a>
      </div>
    </div>
  );
}
export default Intro;
