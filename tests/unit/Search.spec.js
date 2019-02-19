import Vue from 'vue';
import Search from '@/components/Search.vue';

describe('Search.vue', () => {
    
    it('Is Labelled Properly', () => {
        const Constructor = Vue.extend(Search);
        const SearchComponent = new Constructor().$mount();

        expect(SearchComponent.label).toBe('Pick-up Location');
        expect(SearchComponent.placeholder).toBe('city, airport, station, region and district...');
    });
});