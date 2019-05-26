import { Component, OnInit } from '@angular/core';
import { VirtualTable } from 'src/app/shared/models/virtual-table.model';
import { Image } from 'src/app/shared/models/image.model';
import { PayMethod } from 'src/app/shared/models/pay-method.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ModalController } from '@ionic/angular';
import { EnterVirtualTableModalPage } from '../../modals/enter-virtual-table-modal/enter-virtual-table-modal.page';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  coverflowSlidesOptions: any;
  promotedChefs: any[];
  virtualTables: VirtualTable[];
  authUser: any;
  userData: User;

  constructor(
    private router: Router,
    private readonly afs: AngularFirestore,
    private authService: AuthenticationService,
    private modalController: ModalController

  ) { }


  ngOnInit(): void {
    this.userData = new User('', '', '', 5.0, null);
    this.coverflowSlidesOptions = {
      slidesPerView: 1,
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false
      },
      on: {
        beforeInit() {
          const swiper = this;

          swiper.classNames.push(
            `${swiper.params.containerModifierClass}coverflow`
          );
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

          swiper.params.watchSlidesProgress = true;
          swiper.originalParams.watchSlidesProgress = true;
        },
        setTranslate() {
          const swiper = this;
          const {
            width: swiperWidth,
            height: swiperHeight,
            slides,
            $wrapperEl,
            slidesSizesGrid,
            $
          } = swiper;
          const params = swiper.params.coverflowEffect;
          const isHorizontal = swiper.isHorizontal();
          const transform$$1 = swiper.translate;
          const center = isHorizontal
            ? -transform$$1 + swiperWidth / 2
            : -transform$$1 + swiperHeight / 2;
          const rotate = isHorizontal ? params.rotate : -params.rotate;
          const translate = params.depth;
          // Each slide offset from center
          for (let i = 0, length = slides.length; i < length; i += 1) {
            const $slideEl = slides.eq(i);
            const slideSize = slidesSizesGrid[i];
            const slideOffset = $slideEl[0].swiperSlideOffset;
            const offsetMultiplier =
              ((center - slideOffset - slideSize / 2) / slideSize) *
              params.modifier;

            let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
            let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
            // var rotateZ = 0
            let translateZ = -translate * Math.abs(offsetMultiplier);

            let translateY = isHorizontal ? 0 : params.stretch * offsetMultiplier;
            let translateX = isHorizontal ? params.stretch * offsetMultiplier : 0;

            // Fix for ultra small values
            if (Math.abs(translateX) < 0.001) translateX = 0;
            if (Math.abs(translateY) < 0.001) translateY = 0;
            if (Math.abs(translateZ) < 0.001) translateZ = 0;
            if (Math.abs(rotateY) < 0.001) rotateY = 0;
            if (Math.abs(rotateX) < 0.001) rotateX = 0;

            const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            $slideEl.transform(slideTransform);
            $slideEl[0].style.zIndex =
              -Math.abs(Math.round(offsetMultiplier)) + 1;
            if (params.slideShadows) {
              // Set shadows
              let $shadowBeforeEl = isHorizontal
                ? $slideEl.find('.swiper-slide-shadow-left')
                : $slideEl.find('.swiper-slide-shadow-top');
              let $shadowAfterEl = isHorizontal
                ? $slideEl.find('.swiper-slide-shadow-right')
                : $slideEl.find('.swiper-slide-shadow-bottom');
              if ($shadowBeforeEl.length === 0) {
                $shadowBeforeEl = $(
                  `<div class="swiper-slide-shadow-${
                  isHorizontal ? 'left' : 'top'
                  }"></div>`
                );
                $slideEl.append($shadowBeforeEl);
              }
              if ($shadowAfterEl.length === 0) {
                $shadowAfterEl = $(
                  `<div class="swiper-slide-shadow-${
                  isHorizontal ? 'right' : 'bottom'
                  }"></div>`
                );
                $slideEl.append($shadowAfterEl);
              }
              if ($shadowBeforeEl.length)
                $shadowBeforeEl[0].style.opacity =
                  offsetMultiplier > 0 ? offsetMultiplier : 0;
              if ($shadowAfterEl.length)
                $shadowAfterEl[0].style.opacity =
                  -offsetMultiplier > 0 ? -offsetMultiplier : 0;
            }
          }

          // Set correct perspective for IE10
          if (
            swiper.support.pointerEvents ||
            swiper.support.prefixedPointerEvents
          ) {
            const ws = $wrapperEl[0].style;
            ws.perspectiveOrigin = `${center}px 50%`;
          }
        },
        setTransition(duration) {
          const swiper = this;
          swiper.slides
            .transition(duration)
            .find(
              '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left'
            )
            .transition(duration);
        }
      }
    };
    this.authService.currentUser().then(stringAuthUser => {
      this.authUser = JSON.parse(stringAuthUser);
      this.afs.collection<User>('users').valueChanges().subscribe(users => {
        this.userData = users.find(user => user.uid === this.authUser.uid);
      });
    });


    this.afs.collection<VirtualTable>('virtual-tables').valueChanges().subscribe((virtualTables => {
      const today = new Date();
      this.virtualTables = virtualTables.filter(virtualTable => {
        return ((new Date(virtualTable.deadlineForEntering)) > today);
      });

    }));

    this.promotedChefs = [
      {
        urlBanner:
          'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        chefName: 'Jaimito',
        urlProfilePhoto: '../../../../assets/avatars/avatarH1.svg',
        score: 4.9
      },
      {
        urlBanner:
          'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80',
        chefName: 'Fulano',
        urlProfilePhoto: '../../../../assets/avatars/avatarH2.svg',
        score: 2.4
      },
      {
        urlBanner:
          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        chefName: 'Juana',
        urlProfilePhoto: '../../../../assets/avatars/avatarM1.svg',
        score: 4.0
      },
      {
        urlBanner:
          'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        chefName: 'María',
        urlProfilePhoto: '../../../../assets/avatars/avatarM2.svg',
        score: 3.7
      }
    ];

    /* this.virtualTables = [
      new VirtualTable('Comida 1',
        'Anim elit nulla consequat ipsum sint.',
        new Image('', 'https://image.flaticon.com/icons/png/512/1755/1755185.png', '', ''),
        150.00, 0, 10, [new PayMethod('Efectivo', true)],
        new Date(2019, 5, 24, 9, 30, 0),
        new Date(2019, 5, 24, 9, 30, 0),
        null, null, null,
        'qHPFOCsESGb1vGRxYdNyT2115Sy2'
      ),
      new VirtualTable('Comida 1',
        'Cupidatat pariatur Lorem qui dolore quis nulla amet proident dolore nostrud adipisicing.',
        new Image('', 'https://image.flaticon.com/icons/svg/1771/1771647.svg', '', ''),
        5.80, 0, 10, [new PayMethod('MercadoPago', true)],
        new Date(2019, 5, 24, 9, 30, 0),
        new Date(2019, 5, 24, 9, 30, 0),
        null, null, null,
        'vUSVXNDCFTVhvB9Z0HXvOqVUgkY2'
      ),
      new VirtualTable('Comida 1',
        'Minim eu nulla pariatur sunt dolore velit.',
        new Image('', 'https://image.flaticon.com/icons/svg/135/135677.svg', '', ''),
        50.25, 0, 10, [new PayMethod('Tarjeta', true)],
        new Date(2019, 5, 24, 9, 30, 0),
        new Date(2019, 5, 24, 9, 30, 0),
        null, null, null,
        'vUSVXNDCFTVhvB9Z0HXvOqVUgkY2'
      ),
      new VirtualTable('Comida 1',
        'Ea Lorem do ut ex laboris officia amet pariatur labore commodo voluptate eu irure.',
        new Image('', 'https://image.flaticon.com/icons/png/512/1755/1755199.png', '', ''),
        23546.00, 0, 10, [new PayMethod('Efectivo', true)],
        new Date(2019, 5, 24, 9, 30, 0),
        new Date(2019, 5, 24, 9, 30, 0),
        null, null, null,
        'qHPFOCsESGb1vGRxYdNyT2115Sy2'
      ),
      new VirtualTable('Comida 1',
        'Anim elit nulla consequat ipsum sint.',
        new Image('', 'https://image.flaticon.com/icons/svg/1046/1046784.svg', '', ''),
        1560.50, 0, 10, [new PayMethod('Cheque', true)],
        new Date(2019, 5, 24, 9, 30, 0),
        new Date(2019, 5, 24, 9, 30, 0),
        null, null, null,
        'vUSVXNDCFTVhvB9Z0HXvOqVUgkY2'
      ),
      new VirtualTable('Comida 1',
        'Mollit esse elit elit occaecat Lorem nulla mollit amet incididunt nulla.',
        new Image('', 'https://image.flaticon.com/icons/png/512/1755/1755225.png', '', ''),
        260.00, 0, 10, [new PayMethod('Efectivo', true)],
        new Date(2019, 5, 25, 9, 30, 0),
        new Date(2019, 5, 26, 9, 30, 0),
        null, null, null,
        'qHPFOCsESGb1vGRxYdNyT2115Sy2'
      )
    ]; */
  }

  async presentModal(selectedVirtualTable: VirtualTable, comensal: User) {
    const modal = await this.modalController.create({
      component: EnterVirtualTableModalPage,
      componentProps: {
        virtualTableSelected: selectedVirtualTable,
        conmensal: comensal
      }
    });
    await modal.present();
    await modal
      .onDidDismiss()
      .then(res => {
        console.log('Aceptó');
        console.log(res);

      })
      .catch(res => console.log('Canceló'));
  }

}
