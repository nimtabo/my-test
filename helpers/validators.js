exports.validatePhone = (input_phone) => {
  return (input_phone.replace(/\D/g, '').length == 10)
}
