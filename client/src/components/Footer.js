import React from 'react';

import logo from '../assets/img/logo/logo.png';
import footer_bg from '../assets/img/shape/footer_bg.png';
export default function Footer() {
  return (
    <div>
      <div class='footer-main' style={{ backgroundImage: `url(${footer_bg})` }}>
        <div class='footer-area footer-padding'>
          <div class='container'>
            <div class='row d-flex justify-content-between'>
              <div class='col-lg-3 col-md-4 col-sm-8'>
                <div class='single-footer-caption mb-50'>
                  <div class='single-footer-caption mb-30'>
                    <div className='footer-logo animated infinite duration-3s zoomInLeft slower'>
                      <a href='index.html'>
                        <img src={logo} alt='' />
                      </a>
                    </div>
                    <div class='footer-tittle'>
                      <div class='footer-pera'>
                        <p class='info1'>
                          221B Baker Street, P.O Box 353 Park <br /> Road, USA -
                          215431
                        </p>
                        <p class='info2'>info@yourdomain.com</p>
                      </div>
                    </div>
                    <div class='footer-social'>
                      <a href='#'>
                        <i class='fab fa-facebook-f'></i>
                      </a>
                      <a href='#'>
                        <i class='fab fa-twitter'></i>
                      </a>
                      <a href='#'>
                        <i class='fas fa-globe'></i>
                      </a>
                      <a href='#'>
                        <i class='fab fa-behance'></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class='col-lg-2 col-md-4 col-sm-5'>
                <div class='single-footer-caption mb-50'>
                  <div class='footer-tittle'>
                    <h4>Quick Links</h4>
                    <ul>
                      <li>
                        <a href='about.html'>About</a>
                      </li>
                      <li>
                        <a href='about.html'>Features</a>
                      </li>
                      <li>
                        <a href='single-blog.html'>Pricing</a>
                      </li>
                      <li>
                        <a href='blog.html'>Blog</a>
                      </li>
                      <li>
                        <a href='contact.html'>Contact</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class='col-lg-2 col-md-4 col-sm-7'>
                <div class='single-footer-caption mb-50'>
                  <div class='footer-tittle'>
                    <h4>Support</h4>
                    <ul>
                      <li>
                        <a href='#'>Privacy Policy</a>
                      </li>
                      <li>
                        <a href='#'>Terms & Conditions</a>
                      </li>
                      <li>
                        <a href='#'> Sitemap</a>
                      </li>
                      <li>
                        <a href='#'>FAQs</a>
                      </li>
                      <li>
                        <a href='#'>Report a bugb</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class='col-lg-3 col-md-4 col-sm-5'>
                <div class='single-footer-caption mb-50'>
                  <div class='footer-tittle'>
                    <h4>Core Features</h4>
                    <ul>
                      <li>
                        <a href='#'>Email Marketing</a>
                      </li>
                      <li>
                        <a href='#'> Offline SEO</a>
                      </li>
                      <li>
                        <a href='#'>Social Media Marketing</a>
                      </li>
                      <li>
                        <a href='#'>Lead Generation</a>
                      </li>
                      <li>
                        <a href='#'> 24/7 Support</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='footer-bottom-area footer-bg'>
          <div class='container'>
            <div class='footer-border'>
              <div class='row d-flex align-items-center'>
                <div class='col-xl-12 '>
                  <div class='footer-copy-right text-center'>
                    <p>
                      Copyright &copy;
                      <script>document.write(new Date().getFullYear());</script>
                      All rights reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
