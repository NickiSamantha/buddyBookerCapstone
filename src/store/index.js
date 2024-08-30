import { createStore } from 'vuex' ;
import axios from 'axios' ; 
import {toast} from 'toastify' ;
//import 'toastify/dist/index.css';
import router from '@/router';
import {applyToken } from '../service/AuthenticatedUser.js'
import {useCookies} from 'vue3-cookies';
const {cookies} = useCookies()

const apiURL = "https://buddybookercapstone.onrender.com/";

export default createStore({
  state: {
   users: null,
    user: null,
    sitters:null, 
    sitter: null,
    recentSitters: null, 
    bookings: null, 
    booking:null, 
    availableSlots: null,
  },
  getters: {
  },
  mutations: {

    setUsers(state, value) {
      state.users = value;
    } , 
    setUser(state, value) {
      state.user = value;
    },

    setSitters(state, value) {
      state.sitters = value;
    },
    setRecentSitters(state, value) {
      state.recentSitters = value;
    },
    setSitter(state, value) {
      state.sitter = value;
    },
    setBookings(state, value) {
      state.bookings = value;  
    },
    setBooking(state, value) {
      state.booking = value;   
    },
    setAvailableSlots(state, value) {
      state.availableSlots = value;  
    },

  },
  actions: {
    //Users
    async fetchUsers(context) {
      try {
        const { results, msg } = await (await axios.get(`${apiURL}users`)).data
        if (results) {
          context.commit('setUsers', results)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    async fetchUser(context, id) {
      try {
        const { result, msg } = await (await axios.get(`${apiURL}users/${id}`)).data
        if (result) {
          context.commit('setUser', result)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    // async register(context, payload) {
    //   try {
    //     const { msg, err, token } = await (await axios.post(`${apiURL}user/register`, payload)).data
    //     if (token) {
    //       context.dispatch('fetchUsers')
    //       toast.success(`${msg}`, {
    //         autoClose: 2000,
    //         position: toast.POSITION.BOTTOM_CENTER
    //       })
    //       router.push({ name: 'login' })
    //     } else {
    //       toast.error(`${err}`, {
    //         autoClose: 2000,
    //         position: toast.POSITION.BOTTOM_CENTER
    //       })
    //     }
    //   } catch (e) {
    //     toast.error(`${e.message}`, {
    //       autoClose: 2000,
    //       position: toast.POSITION.BOTTOM_CENTER
    //     })
    //   }
    // },
    async updateUser(context, payload) {
      try {
        const { msg, err } = await (await axios.patch(`${apiURL}user/${payload.userID}`, payload)).data
        if (msg) {
          context.dispatch('fetchUsers')
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    async deleteUser(context, id) {
      try {
        const { msg, err } = await (await axios.delete(`${apiURL}user/${id}`)).data
        if (msg) {
          context.dispatch('fetchUsers')
        } else {
          toast.error(`${err}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    },
    // Fetch all bookings
  async fetchBookings(context) {
    try {
      const {results} = await axios.get(`${apiURL}bookings`);
      context.commit("setBookings", results.data);
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  // Fetch a single booking by ID
  async fetchBooking(context, bookingID) {
    try {
      const {result} = await axios.get(`${apiURL}bookings/${bookingID}`);
      context.commit("setBooking", result.data);
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  // Create a new booking
  async createBooking(context, 
    payload

  ) {
    try {
      const result = await axios.post(`${apiURL}bookings`, payload);
      console.log(result.data);

      const bookingDetails = result.data;

      context.dispatch("fetchBookings");  // Refresh the booking list after creation
      toast.success("Booking created successfully!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      context.commit('setBooking', bookingDetails);
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  // Fetch available booking slots
  async fetchAvailableSlots(context, date) {
    try {
      const result = await axios.get(`${apiURL}bookings/slots?date=${date}`);
      context.commit("setAvailableSlots", result.data);
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  // Cancel a booking
  async cancelBooking(context, bookingID) {
    try {
      await axios.delete(`${apiURL}bookings/${bookingID}`);
      context.dispatch("fetchBookings");  // Refresh the booking list after cancellation
      toast.success("Booking cancelled successfully!", {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  //  LOGIN 
  async login(context, payload) {
    try {
      console.log(payload);
      const { message, result, token } = await (await axios.post(`${apiURL}user/login`, payload)).data

      if (result) {
        toast.success(`${message}😎`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
        context.commit('setUser', {
          message,
          result
        })
        cookies.set('LegitUser', { token, message, result })
        applyToken(token)
         router.push({ name: 'sitters' })
      } else {
        toast.error(`${message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
  },

  },
  modules: {
  }
})
