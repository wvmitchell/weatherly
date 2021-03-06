/*
 *
 * HomePageWrapper.js
 *
 */

import styled from 'styled-components';

export default styled.div`
  h1,h2 {
    margin-top: 20px;
    text-align: center;
  }

  input {
    width: 345px;
  }

  form {
    text-align: center;
  }

  span {
    pointer-events: none;
  }

  .todays-weather {
    margin: 20px auto;
    width: 745px;
  }

  .three-day-forecast {
    margin: 0 auto;
    width: 1155px;
  }

  .location-options {
    display: flex;
    flex-wrap: wrap;
    margin: 20px auto;
    width: 50%;
  }

  .location-option {
    margin-left: 20px;
    margin-bottom: 20px;
    padding: 0px 10px;
  }

  .upcoming-weather {
    display: inline-block;
    margin: 20px;
    vertical-align: top;
    width: 345px;
  }
`;
