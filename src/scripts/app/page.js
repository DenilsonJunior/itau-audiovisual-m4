define(["jquery", "frameworks/keen-slider.min"], function ($, KeenSlider) {
  function Page() {
    this.listaTelas = [];
  }

  Page.prototype = {
    init: function () {

      /// Colocar os códigos das intações nesse Arquivo
      this.slide();
      this.flipcard();
      this.arcodeon();
    },
    slide: function () {
      function navigation(slider) {
        let wrapper, dots, arrowLeft, arrowRight

        function markup(remove) {
          wrapperMarkup(remove)
          dotMarkup(remove)
          arrowMarkup(remove)
        }

        function removeElement(elment) {
          elment.parentNode.removeChild(elment)
        }
        function createDiv(className) {
          var div = document.createElement("div")
          var classNames = className.split(" ")
          classNames.forEach((name) => div.classList.add(name))
          return div
        }

        function arrowMarkup(remove) {
          if (remove) {
            removeElement(arrowLeft)
            removeElement(arrowRight)
            return
          }
          arrowLeft = createDiv("arrow arrow--left")
          arrowLeft.addEventListener("click", () => slider.prev())
          arrowRight = createDiv("arrow arrow--right")
          arrowRight.addEventListener("click", () => slider.next())

          wrapper.appendChild(arrowLeft)
          wrapper.appendChild(arrowRight)
        }

        function wrapperMarkup(remove) {
          if (remove) {
            var parent = wrapper.parentNode
            while (wrapper.firstChild)
              parent.insertBefore(wrapper.firstChild, wrapper)
            removeElement(wrapper)
            return
          }
          wrapper = createDiv("navigation-wrapper")
          slider.container.parentNode.appendChild(wrapper)
          wrapper.appendChild(slider.container)
        }

        function dotMarkup(remove) {
          if (remove) {
            removeElement(dots)
            return
          }
          dots = createDiv("dots")
          slider.track.details.slides.forEach((_e, idx) => {
            var dot = createDiv("dot")
            dot.addEventListener("click", () => slider.moveToIdx(idx))
            dots.appendChild(dot)
          })
          wrapper.appendChild(dots)
        }

        function updateClasses() {
          var slide = slider.track.details.rel
          slide === 0
            ? arrowLeft.classList.add("arrow--disabled")
            : arrowLeft.classList.remove("arrow--disabled")
          slide === slider.track.details.slides.length - 1
            ? arrowRight.classList.add("arrow--disabled")
            : arrowRight.classList.remove("arrow--disabled")
          Array.from(dots.children).forEach(function (dot, idx) {
            idx === slide
              ? dot.classList.add("dot--active")
              : dot.classList.remove("dot--active")
          })
        }

        slider.on("created", () => {
          markup()
          updateClasses()
        })
        slider.on("optionsChanged", () => {
          console.log(2)
          markup(true)
          markup()
          updateClasses()
        })
        slider.on("slideChanged", () => {
          updateClasses()
        })
        slider.on("destroyed", () => {
          markup(true)
        })
      }

      //var slider = new KeenSlider("#my-keen-slider", {}, [navigation])

      var slider = new KeenSlider("#my-keen-slider", {
        // Desativa arrastar com mouse e touch
        drag: false,
        // outras opções que usar
        loop: false,
        defaultAnimation: { duration: 300 },
        slides: { perView: 1, spacing: 10 },
      }, [navigation]);

    },
    flipcard: function () {
      const flipCards = document.querySelectorAll('.flip-card');

      flipCards.forEach(cardElement => {
        cardElement.addEventListener('click', function () {
          this.classList.toggle('flipped');

          if (!this.classList.contains('visited')) {
            this.classList.add('visited');
            console.log('Card visitado: Classe "visited" adicionada.');
          }
        });
      });
    },
    arcodeon: function () {
      const buttons = document.querySelectorAll('[data-accordion-button]');

      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const content = button.nextElementSibling;
          const isCurrentlyOpen = button.classList.contains('active');

          closeAllAccordions();

          if (!isCurrentlyOpen) {
            button.classList.add('active');
            button.classList.add('visited');
            content.style.maxHeight = content.scrollHeight + 'px';
          }
        });
      });

      function closeAllAccordions() {
        buttons.forEach(btn => {
          btn.classList.remove('active');
          btn.nextElementSibling.style.maxHeight = null;
        });
      }
    },
  };

  return Page;
});
