import iconAtmCo2 from "./atm_co2.svg"
import iconCountryCo2 from "./country_co2.svg"
import iconCreateNewCustview from "./create_new_custview.svg"
import iconDeleteIcon from "./delete.svg"
import iconEvoGlobalTemp from "./evo_global_temp.svg"
import iconHistTemp from "./hist_temp.svg"
import iconSaveCustView from "./save_custview.svg"
import iconSectorCo2 from "./sector_co2.svg"
import iconCancel from "./cancel.svg"
import iconCustom from "./custom.svg"
import iconClipboard from "./clipboard.svg"
import logoText from "./cc_logo_text.svg"
import logoNoText from "./cc_logo_no_text.svg"

export const imageAssets = {
  logo: {
    text: logoText,
    noText: logoNoText,
  },
  icon: {
    atmCo2: iconAtmCo2,
    countryCo2: iconCountryCo2,
    createNewCustview: iconCreateNewCustview,
    deleteIcon: iconDeleteIcon,
    evoGlobalTemp: iconEvoGlobalTemp,
    histTemp: iconHistTemp,
    saveCustView: iconSaveCustView,
    sectorCo2: iconSectorCo2,
    cancel: iconCancel,
    custom: iconCustom,
    clipboard: iconClipboard,
  },
}

export const buttonAssets = {
  btnAtmCo2: {
    icon: iconAtmCo2,
    altText: "atmco2",
    buttonText: "Atmospheric & Antarctic Concentrations",
  },
  btnCountryCo2: {
    icon: iconCountryCo2,
    altText: "countryco2",
    buttonText: "CO2 Emissions by Country",
  },
  btnNewCustView: {
    icon: iconCreateNewCustview,
    altText: "create new view",
    buttonText: "Create New Customized View",
  },
  btnDelete: {
    icon: iconDeleteIcon,
    altText: "delete",
    buttonText: "Delete",
  },
  btnEvoGlobalTemp: {
    icon: iconEvoGlobalTemp,
    altText: "global temp evolution",
    buttonText: "Evolution of Global Temperature",
  },
  btnHistTemp: {
    icon: iconHistTemp,
    altText: "hist temp",
    buttonText: "Historic Temperatures",
  },
  btnSaveCustView: {
    icon: iconSaveCustView,
    altText: "save custom view",
    buttonText: "Save Customized View",
  },
  btnSectorCo2: {
    icon: iconSectorCo2,
    altText: "sectorco2",
    buttonText: "CO2 Emissions by Sector",
  },
  btnCancel: {
    icon: iconCancel,
    altText: "cancel",
    buttonText: "Cancel changes",
  },
  btnCustom: {
    icon: iconCustom,
    altText: "custom",
    buttonText: "text",
  },
}
