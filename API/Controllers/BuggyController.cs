using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController: BaseApiController
    {
        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> GetSecretText(){
            return "secret stuff";
        }
    }
}