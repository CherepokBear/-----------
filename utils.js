export const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "&lt").replace("<", "&gt")
    };
  
export function delay(data) {
    return new Promise((resolve)=>{
      setTimeout(() => {
        resolve(data);
      }, 300);
    })
  }