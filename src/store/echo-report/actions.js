import $http from '../../boot/token_request'

export async function printLabo({}, id) {
  try {
    const res = await $http.post('/reports/print-labo-sr/' + id);
    console.log(res.data)
    return res.data
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function printPatient({}, id) {
  try {
    const res = await $http.post('/reports/print-patient-sr/' + id);
    return res.data
  } catch (e) {
    return false
  }
}

export async function downloadLabo({}, id) {
  try {
    const res = await $http.post('/reports/print-labo-sr/' + id);
    if (res.data.status) {
      setTimeout(function () {
        $http.get(res.data.data.docx, {responseType: 'blob'})
          .then(response => {
            const blob = new Blob([response.data], {type: 'application/docx'})
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = res.data.label.docx
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error);
      }, 2000);
      return res.data
    }
  } catch (e) {
    return false
  }
}

export async function printEcho({}, id) {
  try {
    const res = await $http.post('/reports/print-echo/' + id);
    return res.data
  } catch (e) {
    return false
  }
}

export async function printEchoBaby({}, id) {
  try {
    const res = await $http.post('/reports/print-echo-baby/' + id);
    return res.data
  } catch (e) {
    return false
  }
}

export async function downloadEchoBabyDocx({}, id) {
  try {
    const res = await $http.post('/reports/print-echo-baby/' + id);
    if (res.data.status) {
      setTimeout(function () {
        $http.get(res.data.data.docx, {responseType: 'blob'})
          .then(response => {
            const blob = new Blob([response.data], {type: 'application/docx'})
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = res.data.label.docx
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error);
      }, 2000);
      return res.data
    }
  } catch (e) {
    return false
  }
}
