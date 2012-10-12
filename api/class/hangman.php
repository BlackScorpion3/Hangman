<?php
/**
 * Description of hangman
 *
 * @author Gavin Hellyer
 */
class hangman
{

    protected $_word;
    protected $_letters;
    protected $_complete = false;
    protected $_result;
    
    public function __construct()
    {
        if (isset($_SESSION['hangman'])) {
            $hangman = &$_SESSION['hangman'];
        }
        else {
            $_SESSION['hangman'] = (object) array('active' => null, 'archive' => null);
            $hangman = &$_SESSION['hangman'];
        }
        
        // check if there is an active game and load it
        if ($hangman->active) {
            $this->loadGame($hangman->active);
            $hangman->active = &$this;
        }
        else {
            $hangman->active = &$this;
            $this->generate();
        }
    }
    
    public function _instance()
    {
        return new self;
    }
    
    public function loadGame($active)
    {
        $this->_word = $active->getWord();
        $this->_letters = $active->getLetters();
    }
    
    public function generate()
    {
        $words = file('lib/words');
        $this->_word = strtolower(preg_replace("/[^a-zA-Z]+/", '', $words[array_rand($words)]));
        
        return $this;
    }
    
    public function getWord()
    {
        return $this->_word;
    }
    
    public function getLetters()
    {
        return $this->_letters;
    }
    
    public function getLetterCount()
    {
        return strlen($this->_word);
    }
    
    public function isLetterValid($letter)
    {
        if (strlen($letter) == 1 && ctype_alpha($letter)) {
            return true;
        }
        return false;
    }
    
    public function isLetterCorrect($letter)
    {
        if (strpos($this->_word, $letter) !== false) {
            return true;
        }
        return false;
    }
    
    public function hasLetter($letter)
    {
        if (!is_null($this->_letters) && in_array($letter, $this->_letters)) {
            return true;
        }
        return false;
    }
    
    public function setLetter($letter)
    {
        $this->_letters[] = strtolower($letter);
        
        return $this;
    }
    
    public function getLetterIndex($letter)
    {
        if ($this->isLetterCorrect($letter)) {
            $index = array();
            if (strpos($this->_word, $letter) !== false) {
                preg_match_all('/' . $letter . '/', $this->_word, $matches);
                $offset = 0;
                foreach($matches[0] as $match) {
                    $index[] = strpos($this->_word, $match, $offset);
                    $offset++;
                }
                return $index;
            }
        }
        return false;
    }
    
    public function isComplete()
    {
        return $this->_complete;
    }
    
    public function archiveGame()
    {
        //TODO: Archive A Game
    }
    
    public function resetGame()
    {
        $this->_word = null;
        $this->_letters = null;
        $this->_complete = false;
        $this->_result = null;
        $this->generate();
        
        return $this;
    }

    /*
     * Static Api Calls
     */
    public static function create($params = null)
    {
        $self = self::_instance();
        if (isset($params->continueGame) && isTrue($params->continueGame)) {
            $wordLength = $self->getLetterCount();
            $letters = $self->getLetters();
        }
        else {
            $wordLength = $self->resetGame()->getLetterCount();
            $letters = null;
        }
        
        return array('wordLength' => $wordLength, 'letters' => $letters);
    }
    
    public static function validateLetter($params)
    {
        if (isset($params->letter)) {
            $self = self::_instance();
            $valid = $self->isLetterValid($params->letter);
            if ($valid) {
                if (!$self->hasLetter($params->letter)) {
                    $self->setLetter($params->letter);
                }
                return array('accepted' => $self->isLetterCorrect($params->letter), 'index' => $self->getLetterIndex($params->letter));
            }
            else {
                return array('error' => 'The Hangman looked at the letter and threw it back in the messengers face!');
            }
        }
        else {
            return array('error' => 'The letter was lost');
        }
    }
    
    public static function reset()
    {
        return self::create();
    }
    
}

?>
