'use strict';

const TRANSITION_NEXT_PAGE_TIME = 2000;
const ANIMATION_POPUP_TIME = 3000;


const questionFirst = document.querySelector('#question-1');
const questionSecond = document.querySelector('#question-2');
const questionThird = document.querySelector('#question-3');
const questionFourth = document.querySelector('#question-4');
const questionFifth = document.querySelector('#question-5');
const popupLoader = document.querySelector('.popup-loader');
const mainDescriptionTop = document.querySelector('.description__top-wrap');
const mainDescriptionBottom = document.querySelector('.description__bottom-wrap');
const questionFirstWrap = document.querySelector('.content-page__main-question--bottom');
const footer = document.querySelector('.footer');
const anchorButton = document.querySelector('a[href="#question-1"]');
const popupMicrophone = document.querySelector('.popup-loader--microphone');
const progressBar = document.querySelector('.popup-loader__progress');
const percentBar = document.querySelector('.popup-loader__percent');
const callButton = document.querySelector('#call');
const cardTemplate = document.querySelector('#card');
const footerNote = document.querySelector('.note');
const tommorowDay = document.querySelector('.tomorrow-day');


const isVisible = (elem) => {
  const coords = elem.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;

  const topVisible = coords.top > 0 && coords.top < windowHeight;
  const bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
};


const showAnimation = (elem) => {
  return () => {
    if (isVisible(elem)) {
      elem.style.animationName = 'opacity';
      elem.style.animationDuration = '5s';
      elem.style.animationFillMode = 'forwards';
    }
  }
}


if (mainDescriptionTop) {
  window.addEventListener('scroll', showAnimation(mainDescriptionTop))
}

if (mainDescriptionBottom) {
  window.addEventListener('scroll', showAnimation(mainDescriptionBottom))
}

if (questionFirstWrap) {
  window.addEventListener('scroll', showAnimation(questionFirstWrap))
}

if (footer) {
  window.addEventListener('scroll', showAnimation(footer))
}


if (anchorButton) {
  anchorButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    const id = anchorButton.getAttribute('href');
    console.log(id)
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  })
}


const onButtonClick = (url) => {
  return (evt) => {
    evt.preventDefault();
    popupLoader.style.display = 'flex';

    setTimeout(() => {
      document.location.href = url;
    }, TRANSITION_NEXT_PAGE_TIME);

    setTimeout(() => {
      popupLoader.style.display = 'none';
    }, ANIMATION_POPUP_TIME);
  }
}


if (questionFirst) {
  questionFirst.addEventListener('click', onButtonClick('question-2.html'));
}

if (questionSecond) {
  questionSecond.addEventListener('click', onButtonClick('question-3.html'));
}

if (questionThird) {
  questionThird.addEventListener('click', onButtonClick('question-4.html'));
}

if (questionFourth) {
  questionFourth.addEventListener('click', onButtonClick('question-5.html'));
}

if (questionFifth) {
  questionFifth.addEventListener('click', onButtonClick('answer.html'));
}


if (popupMicrophone) {
  const changePercentBar = (percent, resolve) => {
    setTimeout(() => {
      resolve(percentBar.textContent = percent)
    }, ANIMATION_POPUP_TIME / 5);
  };

  const renderPercentBar = (percent) => {
    return new Promise((resolve) => {
      changePercentBar(percent, resolve);
    })
  };

  renderPercentBar('20%')
    .then(() => {
      return renderPercentBar('40%')
    })
    .then(() => {
      return renderPercentBar('60%')
    })
    .then(() => {
      return renderPercentBar('80%')
    })
    .then(() => {
      return renderPercentBar('100%')
    });
};

if (callButton) {
  const cardPopup = cardTemplate.content.querySelector('.popup-card');

  const renderFilmElements = (films) => {
    const filmListFragment = document.createDocumentFragment();

    films.forEach((film) => {
      const filmElement = document.createElement('li');
      const filmLink = document.createElement('a');
      filmElement.classList.add('popup-card__sub-item');
      filmLink.classList.add('popup-card__film');
      filmLink.href = film;
      filmLink.textContent = film;
      filmElement.appendChild(filmLink);
      filmListFragment.appendChild(filmElement);
    });

    return filmListFragment;
  };

  const renderSpeciesElements = (species) => {
    const speciesListFragment = document.createDocumentFragment();

    species.forEach((subspecies) => {
      const subspeciesElement = document.createElement('li');
      subspeciesElement.classList.add('popup-card__sub-item', 'popup-card__sub-item--species');
      subspeciesElement.textContent = subspecies;
      speciesListFragment.appendChild(filmElement);
    });

    return speciesListFragment;
  };

  const renderVehicleElements = (vehicles) => {
    const vehicleListFragment = document.createDocumentFragment();

    vehicles.forEach((vehicle) => {
      const vehicleElement = document.createElement('li');
      const vehicleLink = document.createElement('a');
      vehicleElement.classList.add('popup-card__sub-item');
      vehicleLink.classList.add('popup-card__vehicle');
      vehicleLink.href = vehicle;
      vehicleLink.textContent = vehicle;
      vehicleElement.appendChild(vehicleLink);
      vehicleListFragment.appendChild(vehicleElement);
    });

    return vehicleListFragment;
  };

  const renderStarshipElements = (starships) => {
    const starshipListFragment = document.createDocumentFragment();

    starships.forEach((starship) => {
      const starshipElement = document.createElement('li');
      const starshipLink = document.createElement('a');
      starshipElement.classList.add('popup-card__sub-item');
      starshipLink.classList.add('popup-card__starship');
      starshipLink.href = starship;
      starshipLink.textContent = starship;
      starshipElement.appendChild(starshipLink);
      starshipListFragment.appendChild(starshipElement);
    });

    return starshipListFragment;
  };

  const getMaskPage = () => {
    const mask = document.createElement('div');
    mask.style.position = 'absolute';
    mask.style.top = '0';
    mask.style.bottom = '0';
    mask.style.left = '0';
    mask.style.right = '0';
    mask.style.backgroundColor = '#202024';
    mask.style.opacity = '0.9';

    return mask;
  }

  const renderCardPopup = (card) => {
    const { name, height, mass, hair_color, skin_color, eye_color,
      birth_year, gender, homeworld, films, species, vehicles, starships, created, edited, url } = card;

    const bodyPage = document.querySelector('.page__body');

    const cardPopupElement = cardPopup.cloneNode(true);

    cardPopupElement.querySelector('.popup-card__title').textContent = name;
    cardPopupElement.querySelector('.popup-card__parameter--height').textContent = `Height: ${height} cm`;
    cardPopupElement.querySelector('.popup-card__parameter--mass').textContent = `Weight: ${mass} kg`;
    cardPopupElement.querySelector('.popup-card__parameter--hair-color').textContent = `Hair color: ${hair_color}`;
    cardPopupElement.querySelector('.popup-card__parameter--skin-color').textContent = `Skin color: ${skin_color}`;
    cardPopupElement.querySelector('.popup-card__parameter--eye-color').textContent = `Eye color: ${eye_color}`;
    cardPopupElement.querySelector('.popup-card__parameter--birth-year').textContent = `Birth year: ${birth_year}`;
    cardPopupElement.querySelector('.popup-card__parameter--gender').textContent = `Gender: ${gender}`;
    cardPopupElement.querySelector('.popup-card__homeworld').href = homeworld;
    cardPopupElement.querySelector('.popup-card__homeworld').textContent = homeworld;

    cardPopupElement.querySelector('.popup-card__sub-list--films').innerHTML = '';
    cardPopupElement.querySelector('.popup-card__sub-list--films').appendChild(renderFilmElements(films));

    cardPopupElement.querySelector('.popup-card__sub-list--species').innerHTML = '';
    cardPopupElement.querySelector('.popup-card__sub-list--species').appendChild(renderSpeciesElements(species));

    if (species.length === 0) {
      cardPopupElement.querySelector('.popup-card__parameter--species').style.display = 'none';
    }

    cardPopupElement.querySelector('.popup-card__sub-list--vehicles').innerHTML = '';
    cardPopupElement.querySelector('.popup-card__sub-list--vehicles').appendChild(renderVehicleElements(vehicles));

    cardPopupElement.querySelector('.popup-card__sub-list--starships').innerHTML = '';
    cardPopupElement.querySelector('.popup-card__sub-list--starships').appendChild(renderStarshipElements(starships));

    cardPopupElement.querySelector('.popup-card__time--created').dateTime = created;
    cardPopupElement.querySelector('.popup-card__time--created').textContent = new Date(created).toString();

    cardPopupElement.querySelector('.popup-card__time--edited').dateTime = edited;
    cardPopupElement.querySelector('.popup-card__time--edited').textContent = new Date(edited).toString();

    cardPopupElement.querySelector('.popup-card__url').href = url;

    cardPopupElement.style.position = 'fixed';
    cardPopupElement.style.top = '50%';
    cardPopupElement.style.left = '50%';
    cardPopupElement.style.transform = 'translate(-50%, -50%)';
    cardPopupElement.style.maxHeight = '50%';
    cardPopupElement.style.overflowY = 'auto';

    const currentMask = bodyPage.appendChild(getMaskPage());
    bodyPage.appendChild(cardPopupElement);

    currentMask.addEventListener('click', (evt) => {
      if (evt.target !== cardPopupElement) {
        cardPopupElement.remove();
        currentMask.remove();
      }
    })
  };


  const getData = (onSuccess) => {
    return fetch('https://swapi.dev/api/people/1/')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Не удалось получить данные');
        }
      })
      .then((card) => {
        onSuccess(card);
      });
  };


  callButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    getData((card) => {
      renderCardPopup(card);
    })
      .catch((err) => console.log('Error:', err.message, err.stack));
  });
};


if (footerNote) {
  footerNote.style.cursor = 'pointer';
  footerNote.classList.add('note--hidden');

  footerNote.addEventListener('click', () => {
    footerNote.classList.toggle('note--hidden');
  });
};


if (tommorowDay) {
  const date = new Date();
  const tomorrowDate = new Date(date.setDate(date.getDate() + 1));
  const month = (tomorrowDate.getMonth() < 10) ? `0${tomorrowDate.getMonth() + 1}` : `${tomorrowDate.getMonth() + 1}`;

  tommorowDay.textContent = `${tomorrowDate.getDate()}.${month}.${tomorrowDate.getFullYear()}`;
}
