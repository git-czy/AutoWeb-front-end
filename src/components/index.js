import NAV_HEADER from './nav-header/index.vue';

function MountComponent(app) {
    app.component('nav-header', NAV_HEADER);
}

export const UseComponent = MountComponent
