import axios from 'axios';
const URL = 'http://localhost:9898';

const Ground = {
    URL: URL, // Add this line to expose the URL

    //Add Ground
    addGround(mId, Ground) {
        return axios.post(URL + "/turf-data/save/" + mId, Ground, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    //get all Ground details
    getGround() {
        return axios.get(URL + "/get-allTurf");
    },

    getOneGround(tId) {
        return axios.get(URL + `/get-one/${tId}`);
    },

    // Add this method for deleting a turf
    deleteTurf(turfId) {
        return axios.delete(`${URL}/delete-turf/${turfId}`);
    }
}

export default Ground;