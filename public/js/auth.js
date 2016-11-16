$('#ui_signup_birth').pickdate({
  format: 'dddd, dd mmm, yyyy',
  formatSubmit: 'yyyy/mm/dd',
  selectMonths: true,
  selectYears: 10,
  max: new Date(),
  hiddenName: true
})
