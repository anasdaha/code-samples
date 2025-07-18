<?php

namespace Drupal\custom_entities\Form;

use Drupal\Core\Entity\ContentEntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form controller for the Social entity edit forms.
 */
class SocialForm extends ContentEntityForm {

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form = parent::buildForm($form, $form_state);
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $entity = $this->getEntity();
    $status = parent::save($form, $form_state);

    $message = $status === SAVED_NEW
      ? $this->t('Created the %label Social.', ['%label' => $entity->label()])
      : $this->t('Saved the %label Social.', ['%label' => $entity->label()]);

    $this->messenger()->addMessage($message);
    $form_state->setRedirect('entity.social.canonical', ['social' => $entity->id()]);
  }

}
