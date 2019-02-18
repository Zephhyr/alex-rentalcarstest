<template>
  <div>
    <label for="location-input">
      Pick-up Location
    </label>
    <div>
      <input id="location-input" class="location-input" v-model="locationInput" placeholder="city, airport, station, region and district..."  aria-required="true" required="required" role="textbox">
      <div class="dropdown-container">
        <div class="dropdown" v-if="hasResults">
          <div class="dropdown--item" v-for="item in response.results.docs" :key="item.index">
            <div class="dropdown--placetype"><span>{{ getPlaceType(item) }}</span></div>
            <div>
              <div class="dropdown--item-name">
              {{item.name}}
              </div>
              <div class="dropdown--item-location">
              <span v-if="item.city">{{item.city}}, </span>{{item.country}}
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown" v-else-if="validInput">
          <div class="dropdown--no-results">No results found.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getData from '../api_client/client';

export default {
  name: 'Search',
  data: () => {
    return {
      locationInput: '',
      response: {}
    }
  },
  computed: {
    validInput: function(){
      if(this.locationInput.length > 1){
        return true;
      }
      else{
        return false;
      }
    },
    hasResults: function(){
      if(this.response && this.response.results && this.response.results.numFound && this.response.results.numFound > 1){
        return true;
      }
      else{
        return false;
      }
    }
  },
  watch: {
    locationInput: function(val){
      if(val.length > 1){
        getData(6, val)
          .then(function(data){
            if(this.locationInput.length > 1){
              this.response = data;
            }
            else{
              this.response = {};
            }
          }.bind(this));
      }
      else{
        this.response = {};
      }
    }
  },
  methods: {
    getPlaceType: function(item){
      if(item.placeType){
        switch(item.placeType){
          case 'A':
            return 'Airport';
          case 'C':
            return 'City';
          case 'D':
            return 'District';
          case 'P':
            return 'Place';
          case 'S':
          case 'T':
            return 'Station';
          default:
            return '';
        }
      }
      else {
        return '';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.location-input{
  width:100%;
  padding: 0.5rem;
  border-radius:0.1rem;
  border: 1px #c8ae5b;
}

.dropdown-container{
  position:relative;
}

.dropdown{
  top: 0;
  position: absolute;
  background: white;
  width: 100%;
  border: 1px solid black;
}

.dropdown--item{
  padding:0.5rem 1rem 0.5rem 1rem;
  cursor: pointer;
  display:table;
  width:100%;

  > div{
    display:table-cell;
    vertical-align: middle;
  }
}

.dropdown--item:hover{
  background-color: #e7f4fe
}

.dropdown--item-name{
  color:black;
}
.dropdown--item-location{
  color:#8B8B8B;
}
.dropdown--no-results{
  padding:1rem 1rem 1rem 1rem;
}
.dropdown--item
.dropdown--placetype{
  width:25%;
}
.dropdown--placetype > span{
  background-color: rgb(10, 99, 176);
  color: rgb(255, 255, 255);
  border-radius:0.3rem;
  padding: 0.5rem;
}
</style>
