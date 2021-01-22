using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace Tabloid_Fullstack.Models
{
    public class Subscription
    {
        public int Id { get; set; }
        public int SubscriberUserProfileId { get; set; }
        public int ProviderUserProfileId { get; set; }
        public DateTime BeginDateTime { get; set; }
        public DateTime EndDateTame { get; set; }
    }
}
