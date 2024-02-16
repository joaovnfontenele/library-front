import { useToast } from 'vue-toast-notification'

const $toast = useToast()

function success(msg: string) {
  $toast.success(msg, {
    position: 'top-right',
  })
}

function error(msg: string) {
  $toast.error(msg, {
    position: 'top-right',
  })
}

export default {
  success,
  error,
}
