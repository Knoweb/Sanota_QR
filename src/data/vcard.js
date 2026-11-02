// SANOTA Global - Executive Director vCard Details
export const DIRECTOR_VCARD = {
  fullName: "Sahan Ranasinghe",
  firstName: "Sahan",
  lastName: "Ranasinghe",
  title: "Managing Director",
  company: "Sanota (Pvt) Ltd",
  brandName: "SANOTA Global",
  phone: "+94716834335",
  displayPhone: "+94 71 683 4335",
  localPhone: "071 683 4335",
  email: "sahan@sanotaglobal.com",
  website: "https://www.sanotaglobal.com/",
  displayWebsite: "www.sanotaglobal.com",
  linkedin: "https://www.linkedin.com/company/sanotalk/",
  street: "No. 11/1/2, Udugama road, Makuluwa",
  city: "Galle",
  country: "Sri Lanka",
  fullAddress: "No. 11/1/2, Udugama road, Makuluwa, Galle, Sri Lanka",
  displayAddress: "No. 11/1/2, Udugama Rd, Makuluwa, Galle",
  note: "Integrated Engineering Solutions - Industrial Automation, Smart Greenhouse, IoT, Vision Systems, R&D."
};

/**
 * Generates RFC 2426 compliant vCard 3.0 string
 */
export function generateVCardString(card = DIRECTOR_VCARD) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${card.fullName}`,
    `N:${card.lastName};${card.firstName};;;`,
    `ORG:${card.company}`,
    `TITLE:${card.title}`,
    `TEL;TYPE=CELL,VOICE,PREF:${card.phone}`,
    `EMAIL;TYPE=WORK,INTERNET,PREF:${card.email}`,
    `URL;TYPE=WORK:${card.website}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${card.linkedin}`,
    `ADR;TYPE=WORK,POSTAL,PARCEL:;;${card.street};${card.city};;;${card.country}`,
    `LABEL;TYPE=WORK,POSTAL,PARCEL:${card.fullAddress}`,
    `NOTE:${card.note}`,
    "END:VCARD"
  ].join("\r\n");
}

/**
 * Triggers direct .vcf download / mobile contact card import
 */
export function downloadVCard(card = DIRECTOR_VCARD) {
  const vcardText = generateVCardString(card);
  const blob = new Blob([vcardText], { type: "text/vcard;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${card.firstName}_${card.lastName}_SANOTA.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 3000);
}
