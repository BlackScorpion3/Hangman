<?php
/**
 * Description of ajax
 *
 * @author Gavin Hellyer
 */
class ajax
{

    // data for output
    public $_content;
    // args from $_POST
    protected $_args;
    // class to call
    protected $_class;
    // method to call
    protected $_method;
    // params for the method
    protected $_params;
    
    public function __construct()
    {
        $this->_args = array_to_object($_POST);
        
        $this->_setClass();
        $this->_setMethod();
        $this->_setParams();
        
        $this->_call();
    }
    
    private function _setClass()
    {
        if (isset($this->_args->api) && class_exists($this->_args->api)) {
            $this->_class = $this->_args->api;
        }
    }
    
    private function _setMethod()
    {
        if (isset($this->_args->func)) {
            $this->_method = $this->_args->func;
        }
    }
    
    private function _setParams()
    {
        if (isset($this->_args->params)) {
            $this->_params = $this->_args->params;
        }
    }
    
    private function _call()
    {
        if ($this->_class && $this->_method) {
            $reflection = new ReflectionClass($this->_class);
            if ($reflection->hasMethod($this->_method) && $reflection->getMethod($this->_method)->isStatic()) {
                $class = $this->_class;
                $method = $this->_method;

                $this->_content = $class::$method($this->_params);
                
                return;
            }
        }
        $this->_content = array('error' => 'Api not Found');
    }
    
    public function output()
    {
        if (is_null($this->_content)) {
            $this->_content = array('error' => 'No Output');
        }
        return json_encode($this->_content);
    }

}

?>
