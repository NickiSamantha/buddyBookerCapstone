import { createStore } from 'vuex' ;
import axios from 'axios' ; 
import {toast} from 'vue3-toastify' ;
import 'vue3-toastify/dist/index.css';
import router from '@/router';
import {applyToken } from '../service/AuthenticatedUser.js'
import {useCookies} from 'vue3-cookies';
const {cookies} = useCookies()
applyToken( cookies.get('LegitUser')?.token )
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
    token: null, 
    role: null,
    cart : JSON.parse(cookies.get("cart"))||[],
    auth: {
      userID: null , 
    },
  },
  getters: {
  },
  mutations: {
    //updateBookings
    updateUserBookings(state, bookings) {
      if (state.user && state.user.id) {
        state.user.bookings = bookings;
      }
    },
//CART

setCart(state, cart) {
  state.cart = cart;
  const userID = state.auth.userID
  const cookieOptions = {
    expires: 30
  };
  cookies.set(`cart_${userID}`,JSON.stringify(cart),cookieOptions);
},
removeFromCart(state, item) {
  state.cart = state.cart.filter(i => i !== item);
  const userID = state.auth.userID
  const cookieOptions = {
    expires: 30
  };
  cookies.set(`cart_${userID}`, JSON.stringify(state.cart), cookieOptions);
},
//set userID
setUserID(state, userID) {
  state.auth.userID = userID;
},
  //Users
    setUsers(state, value) {
      state.users = value;
    } , 
    // setUser(state, {message, result, token}) {
    //   state.user = result;
    //   state.token = token ; 
    //   state.message = message; 
  
    // },
    setUser(state, value) {
      state.user = value
  
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
    // setBookings(state, value) {
    //   state.bookings = value;  
    // },
    // setBooking(state, value) {
    //  state.booking = value;   
    // }, 
    setAvailableSlots(state, value) {
      state.availableSlots = value;  
    },
    // updateBookings(state, value){
    //   state.bookings = value ;
    // }
    //cart 
    addToCart(state, cart){
      state.cart.push(cart)
    },
    //LOGOUT  
    CLEAR_USER(state) {
      state.user = null;
    },

  },
  actions: {
    //Users
    async fetchUsers(context) {
      try {
        const { result, msg } = await (await axios.get(`${apiURL}users`)).data
        console.log(result);
        if (result) {
          context.commit('setUsers', result)
        } else {
          toast.error(`${msg}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        }
      } catch (e) {
        toast.error(`${e.message}` , {
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
    async register(context, payload) {
      try {
        const { message, token } = await (await axios.post(`${apiURL}users/register`, payload)).data
        console.log(message, token);
        if (token) {
          context.dispatch('fetchUsers')
          toast.success(`${message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
          router.push({ name: 'login' })
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
  // async fetchBookings(context) {
  //   try {
  //     const {results} = await axios.get(`${apiURL}:id/bookings`);
  //     context.commit("setBookings", results.data);
  //   } catch (e) {
  //     toast.error(`${e.message}`, {
  //       autoClose: 2000,
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   }
  // },

  // Fetch a single booking by ID
  // async fetchBooking(context, bookingID) {
  //   try {
  //     const {result} = await axios.get(`${apiURL}users/:id/bookings/${bookingID}`);
  //     context.commit("setBookings", result.data);
  //   } catch (e) {
  //     toast.error(`${e.message}`, {
  //       autoClose: 2000,
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   }
  // },

  // Create a new booking
  // async createBooking(context, 
  //   payload

  // ) {
  //   try {
  //     const result = await axios.post(`${apiURL}/users/:id/booking`, payload);
  //     console.log(result.data);

  //     const bookingDetails = result.data;

  //     //context.dispatch("fetchBookings");  // Refresh the booking list after creation
  //     toast.success("Booking created successfully!", {
  //       autoClose: 2000,
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //     context.commit('setBooking', bookingDetails);
  //   } catch (e) {
  //     toast.error(`${e.message}`, {
  //       autoClose: 2000,
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   }
  // },

  // Fetch available booking slots
  // async fetchAvailableSlots(context, date) {
  //   try {
  //     const result = await axios.get(`${apiURL}bookings/slots?date=${date}`);
  //     context.commit("setAvailableSlots", result.data);
  //   } catch (e) {
  //     toast.error(`${e.message}`, {
  //       autoClose: 2000,
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   }
  // },

  // Cancel a booking
  // async cancelBooking(context, bookingID) {
  //   try {
  //     await axios.delete(`${apiURL}bookings/${bookingID}`);
  //     context.dispatch("fetchBookings");  // Refresh the booking list after cancellation
  //     toast.success("Booking cancelled successfully!", {
  //       autoClose: 2000,
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   } catch (e) {
  //     toast.error(`${e.message}`, {
  //       autoClose: 2000,
  //       position: toast.POSITION.BOTTOM_CENTER,
  //     });
  //   }
  // },

  //SITTERS
  async fetchSitters(context) {
    try {
      const  {results}   = await (await axios.get(`${apiURL}sitters`)).data;
      if (results) {
        console.log(results)
        context.commit("setSitters", results);
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  async fetchSitter(context, id) {
    try {
      const {result}  = await (
        await axios.get(`${apiURL}sitters/${id}`)
      ).data;
      if (result) {
        context.commit("setSitter", result);
      } 
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  async addASitter(context, payload) {
    try {
      const msg  = await (
        await axios.post(`${apiURL}sitters/addSitter`, payload)
      ).data;
      if (msg) {
        context.dispatch("fetchSitters");
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  async updateSitter(context, sitID, payload) {
    try {
      console.log(payload);
      const msg  = await (
        await axios.patch(`${apiURL}sitters/update/${sitID}`, payload)
      ).data;
      if (msg) {
        context.dispatch("fetchSitters");
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },
  async deleteSitter(context, sitID) {
    try {
      const { msg } = await (
        await axios.delete(`${apiURL}sitters/delete/${sitID}`)
      ).data;
      if (msg) {
        context.dispatch("fetchSitters");
        toast.success(`${msg}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (e) {
      toast.error(`${e.message}`, {
        autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  },

  //  LOGIN 
  async login({commit}, payload) {
    try {
      console.log(payload);
      const { message, result, token } = await (await axios.post(`${apiURL}users/login`, payload)).data
      if (result) {
        
          toast.success(`${message}`, {
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER
          })
        
        commit('setUser', {
          message,
          result, 
          token
        })
        cookies.set('LegitUser', { token, message, result })
        applyToken(token)

        // Fetch and set user bookings
        const bookings = result.bookings || []; // Assuming result contains bookings
        commit('updateUserBookings', bookings);
  
        
        router.push({name: 'home'})
      //  return {message, result};
      } else {
        toast.error(`${message}`, {
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER
        })
      }
    } catch (e) {
      toast?.error(`${e.message}`, {
        // autoClose: 2000,
        position: toast.POSITION.BOTTOM_CENTER
      })
    }
    

    
  },
  //LOGOUT 
  logout({ commit }) {
    // Clear user from state
    commit('CLEAR_USER');

    //clear user from localStorage/sessionStorage
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');

    // redirect user after logout
    router.push('/login'); 
  },
  toCart({ commit }, game) {
    commit("addToCart", game);
    cookies.set("cart", JSON.stringify(this.state.cart));
  },
//cart
loadCartFromCookies({commit}) {
  const userID = userID 
  const cartCookie = cookies.get(`cart_${userID}`);
  if (cartCookie) {
    const cart = JSON.parse(cartCookie);
    commit('setCart', cart);
  }
},
//updatebooking

//adminpage
async addSitter(context, payload) {
  try {
    const { msg } = await (await axios.post(`${apiURL}sitters/addSitter`, payload)).data
    if (msg) {
      context.dispatch('fetchSitter')
      toast.success(`${msg}`, {
        autoClose: 2000,
        position: 'bottom-center'
      })
    }
  } catch (e) {
    toast.error(`${e.message}`, {
      autoClose: 2000,
      position: 'bottom-center'
    })
  }
},
async addUser(context, payload) {
  try {
    const { token, msg, error } = await (await axios.post(`${apiURL}users/register`, payload)).data
    if (token) {
      context.dispatch('fetchUsers')
      toast.success(`${msg}`, {
        autoClose: 2000,
        position: 'bottom-center'
      })
    } else {
      toast.warning(`${error}`, {
        autoClose: 2000,
        position: 'bottom-center'
      })
    }
  } catch (e) {
    toast.error(`${e.message}`, {
      autoClose: 2000,
      position: 'bottom-center'
    })
  }
},

async editUser(context, user) {
  try {
    const { msg } = await (await axios.patch(`${apiURL}users/update/${user.userID}`, user)).data
    if (msg) {
      context.dispatch('fetchUsers')
      toast.success(`${msg}`, {
        autoClose: 2000,
        position: 'bottom-center'
      })
    }
  } catch (e) {
    toast.error(`${e.message}`, {
      autoClose: 2000,
      position: 'bottom-center'
    })
  }
},
async editSitter(context, sitter) {
  try {
    await (axios.patch(`${apiURL}sitters/update/${sitter.sitID}`, sitter)).data
      context.dispatch('fetchSitters')
      toast.success(`Successfully updated Sitters`, {
        autoClose: 2000,
        position: 'bottom-center'
      })
  } catch (e) {
    toast.error(`${e.message}`, {
      autoClose: 2000,
      position: 'bottom-center'
    })
  }
}
  },



  modules: {
  }
})
