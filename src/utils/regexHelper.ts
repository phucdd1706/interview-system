// const isEmail =
//   /^[A-Za-z0-9ĐÀÁẢẠÃẦẤẨẬẪÂẮẰẶẴĂẲÈÉẸẺẼỂẾỀỆỄÊỊÌÍĨỈÒÓỎỌÕÔỐỒỔỘỖỜỚỠỢỞƠÙÚỤỦŨỨỪỬỮỰƯÝỲỶỸỴđàáảạãầấẩậẫâắằặẵăẳèéẹẻẽểếềệễêịìíĩỉòóỏọõôốồổộỗờớỡợởơùúụủũứừửữựưýỳỷỹỵ]{1}[A-Za-z0-9ĐÀÁẢẠÃẦẤẨẬẪÂẮẰẶẴĂẲÈÉẸẺẼỂẾỀỆỄÊỊÌÍĨỈÒÓỎỌÕÔỐỒỔỘỖỜỚỠỢỞƠÙÚỤỦŨỨỪỬỮỰƯÝỲỶỸỴđàáảạãầấẩậẫâắằặẵăẳèéẹẻẽểếềệễêịìíĩỉòóỏọõôốồổộỗờớỡợởơùúụủũứừửữựưýỳỷỹỵ.@]{2,40}$$/i; // bat dau bang chu cai hoac so, theo sau la chu cai, so hoac dau .
const isEmail = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
const isPhone = /^(\+84[9|8|7|5|3]|0[9|8|7|5|3]|84[9|8|7|5|3])+([0-9]{2})+([ ]?)+([0-9]{3})+([ ]?)+([0-9]{3})\b$/i; // check dinh dang so dien thoai,
const isFullName =
  /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ ]*$/; // check ten chi bao gom chu (a-z) hoac dau cach tu 2 - 40 ky tu
const isUserName = /^[a-zA-Z0-9_-]+$/;

const emailRegEx = /^[a-zA-Z0-9 @ .]+$/;
const passwordRegEx = /^[*]+$/;

export { isEmail, isPhone, isFullName, isUserName, emailRegEx, passwordRegEx };
