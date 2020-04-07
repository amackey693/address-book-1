// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber,addresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = addresses;
}

function Address(emailAddress, homeAddress, workAddress) {
  this.emailAddress = emailAddress;
  this.homeAddress = homeAddress;
  this.workAddress = workAddress;
}

// <!--Business Logic for Addresses-->

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";

  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
    
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  
  if (contact.addresses.emailAddress != "") {
    // console.log(contact.addresses.emailAddress);
    $(".email-address").html("Email Address: " + contact.addresses.emailAddress);
  } else {
    $(".email-address").html("");
  }
  
  if (contact.addresses.homeAddress !== "") {
    $(".home-address").html("Home Address: " + contact.addresses.homeAddress);
  } else {
    $(".home-address").html("");
  }
  
  if (contact.addresses.workAddress !== "") {
    $(".work-address").html("Work Address: " + contact.addresses.workAddress);
  } else {
    $(".work-address").html("");
  }

  var buttons = $("#buttons");

  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedHomeAddress = $("input#new-home-address").val();
    var inputtedWorkAddress = $("input#new-work-address").val();
    var inputtedAddresses = new Address(inputtedEmailAddress, inputtedHomeAddress, inputtedWorkAddress)
    console.log("input email: ", inputtedEmailAddress);
    console.log("Address: ", inputtedAddresses);
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    
    $("input#new-email-address").val("");
    $("input#new-home-address").val("");
    $("input#new-work-address").val("");
  
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddresses);
    console.log("Address Book: ", addressBook);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
