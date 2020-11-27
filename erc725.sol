
// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.6.0;

// modules
import "./ERC725X.sol";
import "./ERC725Y.sol";

/**
 * @title ERC725 bundle
 * @dev Bundles ERC725X and ERC725Y together into one smart contract
 *
 *  @author AMT
 */
    contract ERC725 is ERC725X,ERC725Y{
    address founder;
    mapping(string => identity) identity_id;
    
    struct identity {
        
      
        
        string ssn_id;
        string name;
        string dob;
        string gender;
        uint256 contact_no;
        string email;
        string blood_group;
        string city;
        string state;
        string photoHash;
        string ltHash;
        string rtHash;
        string leHash;
        string reHash;
        
     }
    
    identity id;
    
    constructor() ERC725X(0xFE55a76947BC56e26E2995C8ED2cbBD3dfC69806) ERC725Y(0xFE55a76947BC56e26E2995C8ED2cbBD3dfC69806)  public{
        
         founder=msg.sender; 
        
        }
    
    modifier isOwner() {

      
          require(msg.sender == founder, "Access is not allowed");

        _;
         
    }
    
    function setDetails(string memory _ssn_id,string memory _name,string memory _dob,string memory _gender,uint256 _contact_no,string memory _email,string memory _blood_group, string memory _city,string memory _state,string memory _photoHash,string memory _ltHash,string memory _rtHash,string memory _leHash,string memory _reHash) public {
    
   // _mint(msg.sender,_aadhar_id);
    
    id.name = _name;
    id.dob =  _dob;
    id.gender = _gender;
    id.contact_no = _contact_no;
    id.email = _email;
    id.blood_group = _blood_group;
    id.city = _city;
    id.state = _state;
    id.photoHash = _photoHash;
    id.ltHash = _ltHash;
    id.rtHash = _rtHash;
    id.leHash = _leHash;
    id.reHash = _reHash;
    identity_id[_ssn_id]=id;
    
    
  
}

function getuserDetails(string memory _ssn_id)public view returns(string memory,string memory,string memory,uint256,string memory,string memory,string memory){
    
   
   identity memory _id = identity_id[_ssn_id];
   return(_id.name,_id.dob,_id.gender,_id.contact_no,_id.email,_id.blood_group,_id.city);
   
    
}

function getUserfileDetails(string memory _ssn_id) public view returns(string memory,string memory,string memory,string memory,string memory,string memory){
 
 identity memory _id = identity_id[_ssn_id];
 return(_id.state,_id.photoHash,_id.ltHash,_id.rtHash,_id.leHash,_id.reHash);
    
}

    
    // NOTE this implementation has not by default: receive() external payable {}
    
    
    
    
}
