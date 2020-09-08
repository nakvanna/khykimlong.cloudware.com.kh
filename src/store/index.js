import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import active_route from './active-route'
import blog from './blog'
import staff from './staff'
import patient from './patient'
import address_book from './address-book'
import labo from './labo'
import labo_setting from './labo-setting'
import echo from './echo'
import echo_setting from './echo-setting'
import report from './echo-report'
import room from './room'
import examine from './examine'
import stock from './stock'
import product from './product'
import supplier from './supplier'
import sale from './sale'
import pdf_make from './pdf-make'
import inc_exp from './inc-exp'
import income from './income'
import expense from './expense'
import document from './document'
import doctor from './doctor'
import echo_note from './echo-note'
import ex_ill from './ex-ill'

Vue.use(Vuex)
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      active_route,
      blog,
      staff,
      patient,
      address_book,
      labo,
      labo_setting,
      echo,
      echo_setting,
      report,
      room,
      examine,
      stock,
      product,
      supplier,
      sale,
      pdf_make,
      inc_exp,
      income,
      expense,
      document,
      doctor,
      echo_note,
      ex_ill
    },

    // strict: process.env.DEV
    strict: false
  })

  return Store
}
