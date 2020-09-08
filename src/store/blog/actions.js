import $http from '../../boot/token_request'
export async function storeBlog ({commit},data) {
  try {
    const res = await $http.post('/blogs', data);
    if (res.data.status) {
      commit('STORE_BLOG', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function updateBlogThumbnail ({commit},data) {
  let thumbnail = new FormData();
  thumbnail.set('thumbnail',data.get('thumbnail'))
  try {
    const res = await $http.put('/blogs/'+data.get('id')+'/thumbnail',thumbnail);
    if (res.data.status) {
      commit('UPDATE_BLOG', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function updateBlog({commit}, data) {
  try {
    const res = await $http.put('/blogs/'+data.id+'/update', data.data);
    if (res.data.status) {
      commit('UPDATE_BLOG', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function updateBlogContent({commit}, data) {
  try {
    const res = await $http.put('/blogs/'+data.id+'/update-content', data.data);
    if (res.data.status) {
      // commit('UPDATE_STAFF', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function fetchBlog ({commit}) {
  try {
    const res = await $http.get('/blogs');
    if (res.data.status) {
      commit('SET_BLOG', res.data);
    }
    return res.data
  } catch (e) {
    return false
  }
}
export async function editBlog ({commit},id) {
  try {
    const res = await $http.get('/blogs/'+id+'/edit');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}

export async function fetchContentByBlog ({commit},id) {
  try {
    const res = await $http.get('/blogs/'+id+'/content');
    if (res.data.status) {
      return res.data
    }
  } catch (e) {
    return false
  }
}
