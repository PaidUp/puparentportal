<template>
  <td>{{ item.type === 'invoice' ? `${item.paymentDetails.brand}••••${item.paymentDetails.last4}` : ' - ' }}</td>
</template>
<script>
export default {
  props: {
    item: Object
  }
}
</script>

