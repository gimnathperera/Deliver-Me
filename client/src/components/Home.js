import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { BackTop, Modal } from 'antd';
import AOS from 'aos';

import h1_hero from '../assets/img/hero/h1_hero.png';
import testimonial from '../assets/img/testmonial/testimonial.png';
import testimonial2 from '../assets/img/testmonial/testimonial2.png';
import testimonial3 from '../assets/img/testmonial/testimonial3.png';
import have from '../assets/img/team/have.jpg';
import ContactUsForm from './forms/ContactUsForm';
import Footer from './Footer';

export class Home extends Component {
  state = {
    visible: false
  };
  showModal = (parcels) => {
    this.setState({
      parcels: parcels,
      visible: true
    });
  };
  handleOk = (e) => {
    this.setState({
      visible: false
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  };
  render() {
    AOS.init({ duration: 2000, delay: 200 });
    return (
      <div>
        <BackTop />
        <div>
          <div class='slider-area '>
            <div class='slider-active '>
              <div
                class='single-slider slider-height d-flex align-items-center animated fadeInRight delay-2s'
                style={{ backgroundImage: `url(${h1_hero})` }}
              >
                <OwlCarousel
                  className='owl-theme'
                  loop
                  margin={15}
                  dots={false}
                  autoplay
                  autoplayTimeout={9000}
                  items={1}
                >
                  <div class='container'>
                    <div class='row d-flex align-items-center'>
                      <div class='col-lg-7 col-md-9 '>
                        <div class='hero__caption'>
                          <h1>
                            Get It Delivered To
                            <br /> Anyone You Love
                          </h1>

                          <p>
                            Need your parcel to arrive in a hurry? check out our
                            expedited delivery options.Your parcel can even be
                            delivered on the day you book with our brilliantly
                            handy same day service.
                          </p>

                          <div class='hero__btn'>
                            <a href='industries.html' class='btn hero-btn'>
                              Join Us
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-lg-5'>
                        <div class='hero__img d-none d-lg-block'>
                          <lottie-player
                            src='https://assets10.lottiefiles.com/private_files/lf30_s2aiRF.json'
                            background='transparent'
                            speed='0.7'
                            style={{ width: '500px', height: '500px' }}
                            loop
                            autoplay
                          ></lottie-player>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='container'>
                    <div class='row d-flex align-items-center'>
                      <div class='col-lg-7 col-md-9 '>
                        <div class='hero__caption'>
                          <h1>
                            We Work with
                            <br /> & the Best Drivers
                          </h1>
                          <p>
                            Our easy-to-use system makes booking your parcel
                            delivery a breeze. Get a free instant quote and
                            select a courier service that suits you.
                          </p>

                          <div class='hero__btn'>
                            <a href='industries.html' class='btn hero-btn'>
                              Join Us
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-lg-5'>
                        <div class='hero__img d-none d-lg-block'>
                          <lottie-player
                            src='https://assets4.lottiefiles.com/packages/lf20_oV72KM.json'
                            background='transparent'
                            speed='0.7'
                            style={{ width: '500px', height: '500px' }}
                            loop
                            autoplay
                          ></lottie-player>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class='container'>
                    <div class='row d-flex align-items-center'>
                      <div class='col-lg-7 col-md-9 '>
                        <div class='hero__caption'>
                          <h1>
                            We Are Open
                            <br /> 7.00 a.m to 8 p.m
                          </h1>
                          <p>
                            We check hundreds of prices every day to ensure ours
                            are the lowest. In the unlikely event you find a
                            cheaper deal elsewhere, we’ll match any comparable
                            delivery price guaranteed!
                          </p>

                          <div class='hero__btn'>
                            <a href='industries.html' class='btn hero-btn'>
                              Join Us
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class='col-lg-5'>
                        <div class='hero__img d-none d-lg-block'>
                          <lottie-player
                            src='https://assets5.lottiefiles.com/packages/lf20_HvFfKv.json'
                            background='transparent'
                            speed='0.7'
                            style={{ width: '500px', height: '500px' }}
                            loop
                            autoplay
                          ></lottie-player>
                        </div>
                      </div>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          </div>

          <div class='what-we-do we-padding'>
            <div class='container' data-aos='fade-left'>
              <div class='row d-flex justify-content-center'>
                <div class='col-lg-8'>
                  <div class='section-tittle text-center'>
                    <h2>Why Millions Trust us when Sending a Parcel</h2>
                  </div>
                </div>
              </div>
              <div class='row'>
                <div class='col-lg-4 col-md-6'>
                  <div class='single-do active text-center mb-30  hvr-shrink'>
                    <div class='do-icon'>
                      <span class='flaticon-social-media-marketing'></span>
                    </div>
                    <div class='do-caption'>
                      <h4>Parcel Tracking</h4>
                      <p>
                        Easy to track from the moment it has been picked up
                        until it has reached its destination!
                      </p>
                    </div>
                    <div class='do-btn'>
                      <a href='#'>
                        <i class='ti-arrow-right'></i> get started
                      </a>
                    </div>
                  </div>
                </div>

                <div class='col-lg-4 col-md-6'>
                  <div class='single-do active text-center mb-30  hvr-shrink'>
                    <div class='do-icon'>
                      <span class='flaticon-tasks'></span>
                    </div>
                    <div class='do-caption'>
                      <h4>Delivery Quote</h4>
                      <p>
                        Easy price comparison of different couriers under one
                        platform make it so much easier!
                      </p>
                    </div>
                    <div class='do-btn'>
                      <a href='#'>
                        <i class='ti-arrow-right'></i> get started
                      </a>
                    </div>
                  </div>
                </div>

                <div class='col-lg-4 col-md-6'>
                  <div class='single-do active text-center mb-30 hvr-shrink'>
                    <div class='do-icon'>
                      <span class='flaticon-project'></span>
                    </div>
                    <div class='do-caption'>
                      <h4>Fast ordering</h4>
                      <p>
                        24/7 access and fast order placement.Services designed
                        for individual clients!
                      </p>
                    </div>
                    <div class='do-btn'>
                      <a href='#'>
                        <i class='ti-arrow-right'></i> get started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class='we-create-area create-padding'
            style={{ paddingTop: '100px' }}
            id='aboutus'
          >
            <div class='container' data-aos='fade-up'>
              <div class='row d-flex align-items-end'>
                <div class='col-lg-6 col-md-12'>
                  <div class='we-create-img'>
                    <lottie-player
                      src='https://assets2.lottiefiles.com/packages/lf20_bqE1wC.json'
                      background='transparent'
                      speed='0.7'
                      loop
                      autoplay
                    ></lottie-player>
                  </div>
                </div>
                <div class='col-lg-6 col-md-12'>
                  <div class='we-create-cap'>
                    <h3>You May Not Ship Frequently, But When You Do</h3>

                    <p className='hvr-curl-bottom-right'>
                      You may not ship frequently, but when you do, you want an
                      intuitive, responsive and efficient experience from
                      sending to delivery. Deliver-Me for individual shippers
                      provide tools and technology that let you ship from home
                      then track and manage the package as it's in transit.
                    </p>

                    <a
                      class='btn hvr-grow '
                      href='http://localhost:8080/contact-us.xhtml'
                      style={{ color: 'white' }}
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='generating-area ' id='service'>
            <div class='container' data-aos='fade-right'>
              <div class='row d-flex justify-content-center'>
                <div class='col-lg-8'>
                  <div class='section-tittle text-center'>
                    <h2>Make Delivery Without Headaches</h2>
                  </div>
                </div>
              </div>
              <div class='row'>
                <div class='col-lg-6 col-md-6'>
                  <div class='single-generating d-flex mb-30 hvr-float'>
                    <div class='generating-icon'>
                      <span class='flaticon-chart'></span>
                    </div>
                    <div class='generating-cap'>
                      <h4>Tracking Status</h4>
                      <p>
                        Once a order is placed from pickup to destination you
                        can view the status of the parcel.
                      </p>
                    </div>
                  </div>
                </div>
                <div class='col-lg-6 col-md-6'>
                  <div class='single-generating d-flex mb-30 hvr-float'>
                    <div class='generating-icon'>
                      <span class='flaticon-social-media-marketing'></span>
                    </div>
                    <div class='generating-cap'>
                      <h4>No Contracts</h4>
                      <p>
                        Services designd for corporate and individual clients
                        which make it easier to both individual and corporate
                        clients.
                      </p>
                    </div>
                  </div>
                </div>
                <div class='col-lg-6 col-md-6'>
                  <div class='single-generating d-flex mb-30 hvr-float'>
                    <div class='generating-icon'>
                      <span class='flaticon-speaker'></span>
                    </div>
                    <div class='generating-cap'>
                      <h4>User-Friendly Website</h4>
                      <p>
                        The site will surely inspire you with the beautiful and
                        functional design and make your delivering experience
                        better.
                      </p>
                    </div>
                  </div>
                </div>
                <div class='col-lg-6 col-md-6'>
                  <div class='single-generating d-flex mb-30 hvr-float'>
                    <div class='generating-icon'>
                      <span class='flaticon-growth'></span>
                    </div>
                    <div class='generating-cap'>
                      <h4>Proven Quality</h4>
                      <p>
                        You will probably admit that business reputation depends
                        on good customer care standards, customer experiences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='testimonial-area' style={{ paddingTop: '100px' }}>
            <div class='container' data-aos='fade-up'>
              <div class='testimonial-main'>
                <div class='row d-flex justify-content-center'>
                  <div class='col-lg-5  col-md-8 pr-0'>
                    <div class='section-tittle text-center'>
                      <h2>What Client Say About Us</h2>
                    </div>
                  </div>
                </div>
                <div class='row d-flex justify-content-center'>
                  <div class='col-lg-10 col-md-9'>
                    <div class='h1-testimonial-active'>
                      <OwlCarousel
                        className='owl-theme'
                        loop
                        margin={15}
                        dots={false}
                        autoplay
                        items={1}
                      >
                        <div class='single-testimonial text-center'>
                          <div class='testimonial-caption '>
                            <div class='testimonial-top-cap'>
                              <p>
                                Had to send a gift to my mum urgently and
                                Deliver-Me was a real help.It was delivered the
                                next day! Thank you guys!
                              </p>
                            </div>
                            <div class='testimonial-founder d-flex align-items-center justify-content-center'>
                              <div class='founder-img'>
                                <img src={testimonial} />
                              </div>
                              <div class='founder-text'>
                                <span>Roxane Builder</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class='single-testimonial text-center'>
                          <div class='testimonial-caption '>
                            <div class='testimonial-top-cap'>
                              <p>
                                I strongly recommend to work with Deliver-Me. It
                                is the best company ever. I am happy with the
                                service.
                              </p>
                            </div>

                            <div class='testimonial-founder d-flex align-items-center justify-content-center'>
                              <div class='founder-img'>
                                <img src={testimonial2} />
                              </div>
                              <div class='founder-text'>
                                <span>Json Mars</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class='single-testimonial text-center'>
                          <div class='testimonial-caption '>
                            <div class='testimonial-top-cap'>
                              <p>
                                Great shipping company! Always my parcel
                                delivered on the time. Service are superb ,
                                always help you if you need. I am happy ship
                                parcels by this company service.
                              </p>
                            </div>

                            <div class='testimonial-founder d-flex align-items-center justify-content-center'>
                              <div class='founder-img'>
                                <img src={testimonial3} />
                              </div>
                              <div class='founder-text'>
                                <span>Nina Sofia</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </OwlCarousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='have-project' style={{ paddingTop: '150px' }}>
            <div class='container' data-aos='flip-up'>
              <div
                class='haveAproject'
                style={{
                  backgroundImage: `url(${have})`,
                  borderRadius: 0
                }}
              >
                <div class='row d-flex align-items-center' id='contactus'>
                  <div class='col-xl-7 col-lg-9 col-md-12'>
                    <div class='wantToWork-caption'>
                      <h2>Have anything in mind?</h2>
                      <p>Do you have a question? Feel free to contact us.</p>
                    </div>
                  </div>
                  <div class='col-xl-5 col-lg-3 col-md-12'>
                    <div class='wantToWork-btn f-right'>

                      <a
                        href='http://localhost:8080/contact-us.xhtml'
                        class='btn btn-ans'
                      >

                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            title='Keep In Thouch With Us'
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={false}
          >
            <ContactUsForm onCancel={this.handleCancel} />
          </Modal>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
