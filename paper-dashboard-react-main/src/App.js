import { BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";

export default function App() {

    const isAuthenticated = localStorage.getItem('token');
    console.log(isAuthenticated);  
  
    return (
      <BrowserRouter >
       <Switch>
        <Route path="/login" component={Login} />
        {isAuthenticated ? (
          <>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Redirect exact from="/" to="/admin/dashboard" />
          </>
        ) : (
          <Redirect exact from="/" to="/login" />
        )}
      </Switch>
      {/* <Switch>
          <Route
            path="/login"
            component={Login}
          />
        {isAuthenticated ? (
          <>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Redirect to="/admin/dashboard" />
          </>
        ) : (
          <>
            <Route path="/login" render={(props) => <Login {...props} />} />
            <Redirect to="/login" />
          </>
        )}
        
      </Switch> */}
        {/* <Switch>
          <Route
            path="/login"
            component={Login}
          />
          
          <Route
            path="/admin"
            render={(props) => 
            (isAuthenticated != null) ? (
            <AdminLayout {...props} />
            ) : (
              <Redirect to="/login" />
            )
          }
          />
                
          <Redirect exact from="/" to="/admin/login" />
    
        </Switch> */}
      </BrowserRouter>
    );
  }