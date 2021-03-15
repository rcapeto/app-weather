export function condition(condi) {
   switch(condi) {
      case 'storm':
         return {
            name: 'rainy-outline',
            color: '#1ec9ff'
         }
         break;
      case 'clear_day':
         return {
            color: '#ffb300',
            name: 'partly-sunny-outline'
         }
         break;
      case 'rain':
         return {
            name: 'rainy-outline',
            color: '#1ec9ff'
         }
         break;
      default: 
         return {
            name: 'cloud-outline',
            color: '#1ec9ff'
         }
   }
}